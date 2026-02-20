export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { audioData, mimeType } = req.body;
    const API_KEY = process.env.GEMINI_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    try {
        // Gemini 2.0 Flash supports multimodal input (audio)
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Analyze this vocal audio. Identify the musical key, the dominant pitch/note, and suggest three-part harmony intervals (e.g., major third up, perfect fifth up, one octave down) that would sound studio-quality with this vocal. Return ONLY a JSON object: { \"key\": \"...\", \"note\": \"...\", \"intervals\": [3, 7, -12], \"bpm\": 120 }" },
                        {
                            inline_data: {
                                mime_type: mimeType || "audio/wav",
                                data: audioData // Base64 encoded audio
                            }
                        }
                    ]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Gemini API Error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        // Extract JSON from markdown or raw text
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("AI failed to return valid JSON metadata.");

        res.status(200).json(JSON.parse(jsonMatch[0]));

    } catch (error) {
        console.error('Backend Error:', error);
        res.status(500).json({ error: error.message });
    }
}
