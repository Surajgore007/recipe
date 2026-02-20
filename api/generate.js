export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { methodology, dataset, dataType } = req.body;
    const API_KEY = process.env.GEMINI_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

    if (!methodology || !dataset) {
        return res.status(400).json({ error: 'Both methodology and dataset are required for replication analysis' });
    }

    try {
        const promptText = `You are a Digital Peer Reviewer. Your task is to reproduce the results of a scientific paper based on its methodology and a provided dataset.

METHODOLOGY/CLAIMS:
${methodology}

RAW DATASET (${dataType}):
${dataset.substring(0, 15000)} // Truncated to stay within context limits if extremely large

Analyze the data against the methodology. 
1. Does the statistical distribution in the data support the paper's claims?
2. Are there any "Reproducibility Gaps" (e.g., missing variables, p-hacking, insufficient sample size, or results that cannot be derived from the data)?
3. Identify discrepancies between claimed outcomes and actual data patterns.

Return ONLY a JSON object:
{
    "score": number (0-100),
    "verdict": "Confirmed / Divergent / Failed",
    "gaps": [
        { "category": "Category", "description": "Specific gap description", "severity": "High/Medium/Low" }
    ],
    "findings": ["Direct evidence or conflict found in data"],
    "summary": "High-level reproduction summary"
}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
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
        const text = data.candidates[0].content.parts[0].text;

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("AI failed to return valid statistical metadata.");

        res.status(200).json(JSON.parse(jsonMatch[0]));

    } catch (error) {
        console.error('Replication Engine Error:', error);
        res.status(500).json({ error: error.message });
    }
}
