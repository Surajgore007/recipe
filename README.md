# DeepScan AI | Video Deepfake Forensic Tool

A professional-grade "Cyber-Forensics" platform designed to detect video manipulations and restore facial integrity.

## 🛡️ Core Capabilities
- **Deep-Scan Forensics**: Leverages Gemini 2.0 Flash's multimodal video analysis to detect lighting inconsistencies, skin texture anomalies, and temporal jitters.
- **Manipulation Meter**: Provides a real-time "Manipulation Probability" percentage and final verdict.
- **Forensic Hotspots**: Identifies exact timestamps and descriptions of detected artifacts.
- **Integrity Restoration**: Generates an AI-reconstructed preview of the target's original appearance via forensic description.

## 🛠️ Tech Stack
- **Frontend**: Vanilla HTML5, CSS3 (IBM Plex Mono styling), ES6 JavaScript.
- **Backend**: Vercel Serverless Function (`/api/generate.js`) invoking Gemini 2.0 Flash.
- **Visualization**: Pollinations AI for forensic reconstruction previews.

## 📋 Forensic Workflow
1. **Load Core Data**: Select a video file (`.mp4`, `.webm`, etc.).
2. **Initiate Scan**: Click "Start Forensic Scan".
3. **Analyze Intel**:
   - Watch the playback in the viewport.
   - Review the **Manipulation Meter** for probability.
   - Investigate the **Forensic Hotspots** list.
   - Compare the original video with the **Restoration Preview**.

## 🛑 Requirements
- **Vercel Hosting**: Required for the serverless backend.
- **Environment Variable**: `GEMINI_KEY` must be configured in Vercel for Gemini 2.0 Flash access.
