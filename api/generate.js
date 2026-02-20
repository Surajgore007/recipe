export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { target } = req.body;
    if (!target) {
        return res.status(400).json({ error: 'Target sector is required' });
    }

    const API_KEY = process.env.GEMINI_KEY;
    if (!API_KEY) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    try {
        const promptText = `Generate a simulated cybersecurity threat intelligence report for the sector "${target}".
        Return ONLY a JSON object with this structure:
        {
            "summary": "Brief summary of the threat landscape",
            "threats": [
                {
                    "type": "Ransomware/Phishing/DDoS/Zero-Day",
                    "severity": "High/Medium/Low",
                    "description": "Short description of the specific threat",
                    "date": "2026-02-20"
                },
                { "type": "...", "severity": "...", "description": "...", "date": "..." },
                { "type": "...", "severity": "...", "description": "...", "date": "..." },
                { "type": "...", "severity": "...", "description": "...", "date": "..." },
                { "type": "...", "severity": "...", "description": "...", "date": "..." }
            ],
            "actor_visual_prompt": "Description of the hacking group logos or a hooded figure in a dark server room, cyberpunk style"
        }`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `Gemini API Error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text.replace(/```json|```/g, '').trim();

        // Ensure we send valid JSON back
        res.status(200).json(JSON.parse(text));

    } catch (error) {
        console.error('Backend Error:', error);
        res.status(500).json({ error: error.message });
    }
}
