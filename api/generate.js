export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { methodology, dataset, dataType } = req.body;
    if (!methodology || !dataset) {
        return res.status(400).json({ error: 'Methodology and Dataset are required' });
    }

    const API_KEY = process.env.GEMINI_KEY;
    if (!API_KEY) {
        return res.status(500).json({ error: 'Missing GEMINI_KEY' });
    }

    const promptText = `Act as an Autonomous Scientific Replication Engine. Analyze the following methodology against the provided dataset snippets.

    PAPER METHODOLOGY / CLAIMS:
    "${methodology}"

    DATASET SNIPPET (${dataType}):
    "${dataset.substring(0, 15000)}"

    Perform a rigorous cross-examination. Identify reproducibility gaps, statistical anomalies, or logical divergences.
    Provide a single JSON object with:
    {
        "reproducibility_score": "0-100",
        "verdict": "Confirmed / Divergent / Failed",
        "integrity_metrics": {
            "statistical_alignment": number,
            "logical_consistency": number,
            "sample_adequacy": number,
            "transparency_level": number
        },
        "gaps": [
            {"category": "Category", "severity": "High/Medium/Low", "desc": "Description of the reproducibility gap"},
            {"category": "Category", "severity": "High/Medium/Low", "desc": "Description of the reproducibility gap"}
        ],
        "findings": [
            "Specific evidence in data supporting or conflicting with claims",
            "Specific evidence in data supporting or conflicting with claims"
        ],
        "summary": "Full executive peer-review summary",
        "visual_prompt": "Futuristic laboratory workspace, scientific charts, DNA and data nodes, ultra-clean aesthetic"
    }
    Return ONLY JSON.`;

    try {
        // Use Gemini 2.0 Flash as requested by user
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error?.message || `API Error: ${response.status}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        // Robust JSON extraction
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error("AI failed to return valid replication metadata.");

        res.status(200).json(JSON.parse(jsonMatch[0]));

    } catch (error) {
        console.error('Replication Engine Error:', error);
        res.status(500).json({ error: error.message });
    }
}
