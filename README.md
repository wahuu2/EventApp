# 🎉 EventApp

EventApp is a full‑stack Next.js application for managing and showcasing tech events. It features dynamic event pages, API routes powered by MongoDB, and a clean UI built with modern React components. The app is deployed on Vercel and connected to MongoDB Atlas for persistent storage.

👉 Live Demo: **[https://eventapp-cyan.vercel.app](https://eventapp-cyan.vercel.app)**

---

## 🚀 Features
- Browse upcoming events with detailed descriptions, agendas, and images
- Dynamic event detail pages (`/events/[slug]`) generated from MongoDB data
- API routes (`/api/events`, `/api/events/[slug]`) for fetching event data
- Responsive UI built with Next.js and Tailwind CSS
- Hybrid rendering (static + dynamic) for performance and fresh data
- Analytics tracking with PostHog

---

## 🛠️ Tech Stack
- **Frontend**: Next.js 16, React, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **Analytics**: PostHog

---

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/wahuu2/EventApp.git
cd EventApp
```

Install dependencies:
```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your-mongodb-atlas-connection-string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

> ⚠️ On Vercel, set these variables in **Project → Settings → Environment Variables**.

---

## ▶️ Running Locally

Start the development server:
```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🌐 Deployment

To deploy your own version:
1. Push your code to GitHub.
2. Connect the repo to Vercel.
3. In Vercel dashboard → Project Settings → Environment Variables, add:
   - `MONGODB_URI` → your Atlas connection string
   - `NEXT_PUBLIC_BASE_URL` → `https://your-app.vercel.app`
4. Redeploy the app.

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

## 📊 Analytics

Event clicks are tracked with PostHog:
```ts
posthog.capture("event_card_clicked", {
  event_slug: slug,
  event_title: title,
  event_location: location,
  event_date: date,
});
```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License
This project is licensed under the MIT License.
```
