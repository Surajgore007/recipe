# OpenRep AI | Autonomous Scientific Replication Engine

OpenRep is a high-fidelity "Digital Lab" that automatically evaluates the reproducibility of scientific publications by cross-examining methodology claims against raw datasets.

## 🧬 Key Features
- **Statistical Cross-Examination**: Uses Gemini 1.5 Flash to verify if raw data distributions support claimed hypotheses.
- **Reproducibility Gap Detection**: Identifies p-hacking, missing variables, sample size insufficiencies, and logic divergences.
- **Integrity Score**: Provides a 0-100% confidence rating on the reproducibility of the paper.
- **Visual Evidence Ledger**: Highlights specific patterns in the data that either confirm or conflict with the methodology.

## 🛠️ Tech Stack
- **Frontend**: Vanilla HTML5, CSS3 (Professional Lab Aesthetic), ES6 JavaScript.
- **Backend**: Vercel Serverless Function (`/api/generate.js`) invoking Gemini 1.5 Flash.
- **AI Core**: Google Gemini 1.5 Flash (Multimodal Statistical Reasoning).

## 🚀 Scientific Workflow
1. **Define Methodology**: Paste the paper's claims, hypothesis, and experimental setup into the left panel.
2. **Input RAW Data**: Upload the supporting dataset (`.csv`, `.json`, or `.txt`).
3. **Run Cross-Exam**: Click "Perform Cross-Examination".
4. **Review Report**:
   - Check the **Reproducibility %** dial.
   - Investigate **Integrity Metrics** (Logical Consistency, Sample Adequacy, etc.).
   - Review the **Evidence Ledger** for specific data-driven proof.

## 🛑 Security & Requirements
- **Vercel Hosting**: Required for the serverless backend.
- **Environment Variable**: `GEMINI_KEY` must be configured in Vercel. Output structure is optimized for high-speed, secure parsing.
