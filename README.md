# 🛰️ Orbital Command — ISS Live Tracker & AI News Dashboard

A production-ready, real-time ISS tracking dashboard built with **React**, **Vite**, **TypeScript**, and **Tailwind CSS**. Features an interactive Leaflet map, live telemetry, space news intelligence feed, and an AI chatbot powered by OpenRouter.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/TailwindCSS-3-cyan?logo=tailwindcss)

---

## ✨ Features

### 🗺️ ISS Live Tracking
- Real-time ISS coordinates polled every **15 seconds**
- Interactive **Leaflet.js** map with smooth marker animation
- Trajectory path of last **15 positions**
- Speed calculation using the **Haversine formula**
- Manual refresh button

### 👨‍🚀 Astronaut Roster
- Live list of all humans currently in space
- Craft assignments displayed per astronaut

### 📰 Sector Intelligence (News)
- Fetches latest science/tech news via **NewsData.io**
- **Featured article** hero card with full-width layout
- 3-column responsive grid for remaining articles
- **Category filters** (Science, Technology, Health, Environment)
- **Sort by date or source**
- **Search** with clear button
- **LocalStorage caching** for 15 minutes
- Skeleton loaders & empty states
- Fallback space imagery for broken thumbnails

### 🤖 A.I.D.A. Chatbot
- Floating chat interface (bottom-right)
- Powered by **OpenRouter** (Mistral / auto-routed free models)
- **Context-restricted**: only answers based on live dashboard data
- Chat history persisted in **LocalStorage** (last 30 messages)
- Clear chat, typing animation, smooth open/close

### 📊 Charts & Analytics
- Real-time ISS speed **line chart** (Recharts)
- News source distribution **pie chart**
- Animated transitions and tooltips

### 🎨 UI/UX
- **Dark / Light mode** toggle with persistence
- Glassmorphism panels with backdrop blur
- **Framer Motion** animations throughout
- Fully responsive (mobile → tablet → desktop)
- Toast notifications via **react-hot-toast**
- Leaflet map always stays dark regardless of theme

---

## 📁 Project Structure

```
src/
├── chatbot/          # Floating AI chatbot
├── charts/           # Recharts speed & pie charts
├── components/       # NewsCard, skeletons
├── context/          # DataContext, ThemeContext
├── map/              # Leaflet ISS map
├── pages/            # Dashboard layout
├── services/         # API fetch functions
├── types/            # TypeScript interfaces
├── utils/            # Haversine, cn helper
├── App.tsx           # Root component
├── main.tsx          # Entry point
└── index.css         # Tailwind + custom styles
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18
- **npm** ≥ 9

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/orbital-command.git
cd orbital-command
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:

| Variable | Description | Get it from |
|---|---|---|
| `VITE_NEWS_API_KEY` | NewsData.io API key | [newsdata.io](https://newsdata.io/) |
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key | [openrouter.ai](https://openrouter.ai/) |
| `VITE_HF_API_KEY` | HuggingFace token (optional) | [huggingface.co](https://huggingface.co/) |
| `VITE_GEMINI_API_KEY` | Google Gemini key (optional) | [ai.google.dev](https://ai.google.dev/) |

### 4. Start the dev server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🌐 Deployment (Vercel)

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com/)
3. Add environment variables in Vercel dashboard
4. Deploy — the included `vercel.json` handles API rewrites automatically

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Vite 5 | Build tool & dev server |
| TypeScript | Type safety |
| Tailwind CSS 3 | Utility-first styling |
| Leaflet + react-leaflet | Interactive map |
| Recharts | Data visualization |
| Framer Motion | Animations |
| Axios | HTTP client |
| react-hot-toast | Toast notifications |
| Lucide React | Icon library |
| OpenRouter API | AI chatbot backend |
| NewsData.io | News feed |
| Open Notify API | ISS & astronaut data |

---

## ⚠️ Important

> **Never commit your `.env` file.** It is excluded via `.gitignore`. Use `.env.example` as a template for collaborators.

---

## 📄 License

MIT
