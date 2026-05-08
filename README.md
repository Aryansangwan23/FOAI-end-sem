# SpacePulse AI Dashboard

A modern, production-ready React web application featuring live ISS tracking, a real-time news feed, and a context-restricted AI chatbot assistant.

## Features

- **Live ISS Tracking**: Real-time position tracking, orbital velocity calculation, reverse geocoding, and crew manifest using `react-leaflet` and open APIs.
- **Intelligence Feed**: Curated news dashboard with category filtering, search, and local storage caching to optimize API requests.
- **AI Chatbot**: A floating assistant powered by Mistral-7B, strictly grounded in the real-time data displayed on the dashboard (no hallucinations).
- **Interactive Analytics**: Real-time velocity line charts and news source distribution charts using Recharts.
- **Modern UI**: Fully responsive, dark/light mode, smooth Framer Motion animations, and custom UI components built with Tailwind CSS.

## Tech Stack

- **Framework**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Maps**: Leaflet.js + react-leaflet
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **AI API**: Hugging Face Inference API
- **HTTP Client**: Axios

## APIs Used
1. [Open-Notify](http://api.open-notify.org/) - Live ISS coordinates and astronauts.
2. [BigDataCloud](https://www.bigdatacloud.com/free-api/free-reverse-geocode-to-city-api) - Free reverse geocoding for ISS location.
3. [NewsAPI](https://newsapi.org/) or [Spaceflight News API](https://api.spaceflightnewsapi.net/v4/docs/) - Global intelligence feed.
4. [Hugging Face Inference](https://huggingface.co/docs/api-inference/index) - LLM hosting for the AI Chatbot.

## Setup Instructions

1. **Clone & Install**
   \`\`\`bash
   git clone <repo>
   cd "foai end sem"
   npm install
   \`\`\`

2. **Environment Variables**
   Create a \`.env\` file based on \`.env.example\`:
   \`\`\`env
   VITE_NEWS_API_KEY=your_key_here
   VITE_AI_TOKEN=your_hugging_face_token_here
   \`\`\`
   *(Note: The app will gracefully fall back to free public APIs if no News API key is provided, ensuring it runs out of the box).*

3. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

## Deployment (Vercel)

This project is fully configured for Vercel deployment via the included `vercel.json` SPA configuration.

1. Push your code to a GitHub repository.
2. Go to Vercel and import the project.
3. Add the Environment Variables (`VITE_NEWS_API_KEY`, `VITE_AI_TOKEN`) in the Vercel dashboard.
4. Deploy.

## Q&A

**Which LLM model did you use and why?**

"We used mistralai/Mistral-7B-Instruct-v0.2 from Hugging Face because it provides strong instruction-following capabilities, lightweight inference, fast responses, and works well for context-restricted conversational AI systems. Its strict adherence to system prompts allows us to securely ground its responses exclusively to the live dashboard state."
