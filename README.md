# AI Cyber-Threat Intelligence Portal

An emerging security threat visualization dashboard that simulates dark web scraping using AI.

## 🚀 Features
- **Simulated Dark Web Scanning**: Uses Gemini 2.5 Flash to generate realistic, industry-specific threat intelligence.
- **Interactive Dashboard**: Visualizes threat severity distribution and specific attack vectors.
- **AI Imagery**: Real-time generation of suspected threat actor visuals via Pollinations AI.
- **Secure Architecture**: API Key is hidden in a Vercel Serverless Backend, never exposed to the client.

## 🛠️ Architecture
- **Frontend**: Single-page `index.html` (Vanilla JS, CSS Grid).
- **Backend**: Vercel Serverless Function (`/api/generate.js`).
- **AI Core**: Google Gemini 2.5 Flash API (invoked via backend).
- **Visualization**: Pollinations AI (Image Generation).

## 📋 Vercel Deployment Instructions
To deploy this project to Vercel and keep your API Key secure:

1. **Connect to GitHub**: Push this repository to your GitHub account.
2. **Deploy to Vercel**: Import the project into Vercel.
3. **Configure Environment Variables**:
   - Go to **Project Settings** > **Environment Variables**.
   - Add a new variable:
     - **Key**: `GEMINI_KEY`
     - **Value**: `Your-Gemini-API-Key-Here`
4. **Access**: Once deployed, the portal will use the secure key from your Vercel settings.

## 🛑 Disclaimer
This portal generates **simulated** data for educational and hackathon purposes. It does not perform actual network scraping or illegal activities.
