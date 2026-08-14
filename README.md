# Speakeasy

A speaking-practice PWA. Spin the wheel, get an unexpected topic, prepare, speak out loud for a timed session, and rate how it felt. Built to make speaking practice simple enough to do every day.

## Tech stack

- **Next.js 16** (App Router, React 19) + TypeScript
- **Tailwind CSS v4**
- **Prisma 7** with the **Neon** serverless driver adapter
- **PostgreSQL** on [Neon](https://neon.tech) (free tier)
- **Auth.js v5** (credentials) with bcrypt password hashing

## Features

- Topic wheel with unused-topic-first selection and pool reset
- Guest mode — practice without an account, progress stored on the device
- Registration, login, and guest-to-account migration
- Preparation, countdown, and speaking timers with early start/finish
- Optional preparation notes
- Self-rating
- Streak and practice calendar for registered users
- Configurable settings (durations, topic categories, difficulty)
- PWA manifest and app icons; `/about` landing page

## Getting started

Requires Node.js 20+ and a PostgreSQL database (a free [Neon](https://neon.tech) project works).

```bash
npm install
cp .env.example .env   # then fill in DATABASE_URL and AUTH_SECRET
npm run db:migrate     # applies the Prisma migrations
npm run dev            # http://localhost:3000
```

Environment variables:

| Variable       | Purpose                                        |
| -------------- | ---------------------------------------------- |
| `DATABASE_URL` | PostgreSQL connection string (Neon free tier)  |
| `AUTH_SECRET`  | Session signing secret — `openssl rand -base64 32` |

## Scripts

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server                 |
| `npm run build`   | Production build                     |
| `npm run start`   | Run the production build             |
| `npm run lint`    | Lint                                 |
| `npm run db:migrate` | Create/apply migrations          |
| `npm run db:deploy`  | Apply migrations in production   |
| `npm run db:studio`  | Open Prisma Studio                |

## Deploying

Deploys to **Vercel** (free Hobby plan) from the GitHub repository on every push to `main`.

1. Create a database at [neon.tech](https://neon.tech) and copy its connection string.
2. Push the schema: `DATABASE_URL="<url>" npm run db:deploy` (or `npx prisma db push`).
3. Import the repo at [vercel.com](https://vercel.com) and add these environment variables:
   - `DATABASE_URL` — the Neon connection string
   - `AUTH_SECRET` — a fresh value from `openssl rand -base64 32`
4. Deploy.

Guests can use the app with no database at all; registration, streak, and calendar require the database.

## Documentation

[PRD.md](PRD.md), [ARCHITECTURE.md](ARCHITECTURE.md), and [PLAN.md](PLAN.md) are the source of truth for product requirements and technical decisions.
