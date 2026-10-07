# My Portfolio

React + Vite + Tailwind CSS portfolio. All your content lives in one file:
`src/data/userData.js` — update it and the whole site updates.

## Setup

```bash
npm install
npm run dev
```

Site opens at `http://localhost:5173`.

## Where to edit

- `src/data/userData.js` — your name, about, skills, experience, projects, contact links.
- `public/resume.pdf` — drop your resume PDF here (create the `public` folder if missing), matching the `resumeUrl` in userData.js.
- `src/components/ChatWidget.jsx` — the chat UI is ready; the `handleSend` function has a `TODO` where you plug in a real AI API (Groq / OpenAI) later.

## Deploy

Works out of the box on Vercel or Netlify — just connect the repo, or run:

```bash
npm run build
```

and upload the `dist` folder.
