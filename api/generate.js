export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { videoData, mimeType } = req.body;
    const API_KEY = process.env.GEMINI_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    if (!videoData) {
        return res.status(400).json({ error: 'Video data is required' });
    }

    try {
        // Gemini 2.0 Flash supports multimodal video analysis
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Perform a deep-scan forensic analysis on this video to detect deepfake manipulations. Look for lighting inconsistencies, unnatural skin textures, temporal jitters, and misalignment around the mouth and eyes. Return ONLY a JSON object: { \"is_deepfake\": boolean, \"confidence\": number (0-100), \"hotspots\": [\"timestamp - description\"], \"restoration_description\": \"Detailed visual description of the original person's appearance to restore integrity\", \"analysis_summary\": \"...\" }" },
                        {
                            inline_data: {
                                mime_type: mimeType || "video/mp4",
                                data: videoData // Base64 encoded video
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

        // Extract JSON from response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("AI failed to return forensic metadata.");

        res.status(200).json(JSON.parse(jsonMatch[0]));

    } catch (error) {
        console.error('Forensic Scan Error:', error);
        res.status(500).json({ error: error.message });
    }
}
