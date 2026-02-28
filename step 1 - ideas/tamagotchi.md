Tako Companion 🐙
An egocentric NPC companion that narrates your life through your webcam.

Features
Real-time webcam narration every 5 seconds
Three voice modes:
🎭 Deadpan: Flat, observational, quietly judgmental
🎬 Trailer: Epic movie trailer voice for mundane moments
🇸🇬 Singaporean: Singlish mode when SG features detected
Personality customization via 2×2 grid (Sincere↔Ironic, Chill↔Dramatic)
Quick Start
1. Set up environment variables
Make sure your .env file has:

OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...
ELEVENLABS_VOICE_DEADPAN=pNInz6obpgDQGcFmaJgB
ELEVENLABS_VOICE_TRAILER=FF7KdobWPaiR0vkcALHF
ELEVENLABS_VOICE_SINGAPOREAN=pNInz6obpgDQGcFmaJgB
2. Start the backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
3. Start the frontend
cd frontend
npm install
npm run dev
4. Open the app
Go to http://localhost:3000

Click Start Companion
Allow camera access
Watch as your life gets narrated every 5 seconds
Adjust personality in Settings
Architecture
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Webcam     │────▶│   FastAPI    │────▶│   OpenAI     │────▶│  ElevenLabs  │
│   (Browser)  │     │   Backend    │     │   GPT-4o     │     │     TTS      │
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────┘
                            │                                         │
                            │◀────────────────────────────────────────┘
                            ▼                  audio (base64)
                     ┌──────────────┐
                     │  Play Audio  │
                     └──────────────┘
Tech Stack
Frontend: Next.js (Page Router), React, Tailwind CSS
Backend: FastAPI, Python
AI: OpenAI GPT-4o (vision), GPT-4o-mini (text generation)
TTS: ElevenLabs
Structured Outputs: Instructor + Pydantic
API
POST /api/narrate
Analyze a webcam frame and generate narration.

Request:

{
  "image": "data:image/jpeg;base64,...",
  "personality": {
    "sincerity_irony": 0.5,
    "chill_drama": -0.3
  }
}
Response:

{
  "audio": "base64-encoded-mp3",
  "description": "The human stares at a screen...",
  "lore_note": "The warrior contemplates...",
  "voice_style": "deadpan",
  "sg_detected": false,
  "scene_tags": ["desk", "laptop", "indoor"]
}
License
MIT

