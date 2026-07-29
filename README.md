# 🎉 EventApp

EventApp is a full‑stack Next.js application for managing and showcasing tech events. It features dynamic event pages, API routes powered by MongoDB, and a clean UI built with modern React components.

---

## 🚀 Features
- Browse upcoming events with images, descriptions, and agendas
- Dynamic event detail pages (`/events/[slug]`)
- API routes for fetching events (`/api/events`, `/api/events/[slug]`)
- MongoDB Atlas integration for persistent storage
- Deployed seamlessly on Vercel

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, React, TypeScript
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **Analytics**: PostHog (event tracking)

---

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/yourusername/EventApp.git
cd EventApp

Install dependencies:
```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add:

```env
MONGODB_URI=your-mongodb-atlas-uri
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> ⚠️ On Vercel, set these variables in **Project → Settings → Environment Variables**.

---

## ▶️ Running Locally

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:3000` [(localhost in Bing)](https://www.bing.com/search?q="http%3A%2F%2Flocalhost%3A3000%2F") to see the app.

---

## 🌐 Deployment

1. Push your code to GitHub.
2. Connect the repo to Vercel.
3. Add environment variables (`MONGODB_URI`, `NEXT_PUBLIC_BASE_URL`).
4. Deploy — Vercel will build and host your app automatically.

---

## 🗄️ Seeding Events

Insert sample events into MongoDB Atlas using Compass or the Atlas UI. Example:

```json
{
  "title": "The Real Cloud Next 2025",
  "slug": "the-real-cloud-next-2025",
  "description": "Google Cloud Next conference 2025.",
  "image": "/images/event1.png",
  "overview": "Deep dive into cloud technologies and AI.",
  "date": "2025-09-15",
  "time": "09:00 AM",
  "location": "San Francisco, CA",
  "mode": "Hybrid",
  "agenda": ["Keynote", "Breakout Sessions", "Networking"],
  "audience": "Cloud engineers, developers, IT leaders",
  "organizer": "Google Cloud",
  "tags": ["Cloud", "AI", "Google"]
}
```

---

## 📸 Screenshots
- Homepage with event cards
- Event detail page with agenda
- API route JSON response

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License
This project is licensed under the MIT License.
```

---
