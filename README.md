# Focus – Retro Productivity App

A minimal productivity web app with a classic Macintosh look: **calendar**, **task manager** (6 tasks max), and a **rotating motivation quote**.

## Features

- **Motivation quote** – Rotating self-development quote at the top (changes every 30 seconds).
- **Calendar** – Mini calendar in the Today view; navigate previous/next months.
- **Tasks** – Up to **6 tasks per day**:
  - **3 priority** (must-do)
  - **3 optional** (nice-to-have)
- **Daily reset** – Only today and tomorrow are shown; older tasks are cleared automatically.
- **Plan tomorrow** – “Tomorrow” tab to add tasks for the next day before midnight.

## Run locally

```bash
# Install dependencies (use pnpm if you have it)
pnpm install
# or
npm install

# Start dev server
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build for production

```bash
pnpm build
pnpm start
# or
npm run build
npm start
```

## Tech

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS**
- Tasks stored in **localStorage** (no backend).
