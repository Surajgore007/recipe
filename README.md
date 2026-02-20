# AuraVocal AI | Studio-Quality Vocal Harmonizer

AuraVocal is an AI-powered music generation tool that transforms a single raw vocal track into a rich, three-part studio harmony in real-time.

## 🎤 Key Features
- **AI Audio Analysis**: Uses Gemini 2.0 Flash to detect the exact key, pitch, and rhythmic nuances of your voice.
- **Instant Harmonization**: Automatically generates three-part harmonies (+3rd, +5th, -Octave) perfectly synced to your original vocal.
- **Web Audio Engine**: High-fidelity pitch-shifting and effects processing directly in the browser.
- **Studio UI**: Modern glassmorphism interface with a real-time frequency spectrum visualizer.

## 🛠️ Tech Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (Web Audio API, MediaRecorder, Canvas).
- **Backend (Vercel)**: Serverless function using Gemini 2.0 Flash for multimodal audio analysis.
- **Security**: Environment variable `GEMINI_KEY` ensures no keys are leaked.

## 📋 Getting Started
1. **Setup Environment**:
   Ensure `GEMINI_KEY` is set in your Vercel project environment variables.
2. **Launch Studio**:
   Open `index.html` in a browser that supports `AudioContext` and `MediaRecorder` (Chrome, Edge, Firefox).
3. **Record**:
   Click the **Red Record Button**, sing a raw vocal line, and click it again to stop.
4. **Experience the Magic**:
   AuraVocal will analyze your voice and play back your studio-ready harmony stack.

## 🛑 Requirements
- Modern browser with Microphone access.
- Vercel hosting (or local Vercel CLI) for the `/api/generate.js` backend.
