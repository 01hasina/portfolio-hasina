# Hasina Ramisedra — Portfolio

## About

A responsive personal portfolio for Hasina Ramisedra, AI and Data Science student and software developer. Content is kept in `src/data/` for straightforward editing.

## Tech Stack

Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React and Resend for optional contact email delivery.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open http://localhost:3000.

## Environment Variables

Copy `.env.example` to `.env.local`. `RESEND_API_KEY` is optional for local development; without it, the form gives a clear email fallback. Set `CONTACT_EMAIL` to the receiving address and `NEXT_PUBLIC_SITE_URL` to the deployed canonical URL. Never commit `.env.local`.

## Build

```bash
npm run build
npm run start
```

## Deployment

Push this project to a Git repository, import it into Vercel and configure the environment variables in the Vercel project settings. Next.js is detected automatically.

## Vercel

Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and `NEXT_PUBLIC_SITE_URL` to Production (and Preview if appropriate). Resend sender domains must be verified to send from a custom address; the current route uses Resend's onboarding sender.

## Project Structure

```text
src/app/       App Router pages, styles and contact API
src/data/      Profile, experience, education, skills and project content
public/        Static metadata assets; add the real CV PDF here
```

## Customization

- Update the content in `src/data/`.
- Add the real CV as `public/Hasina-Ramisedra-CV.pdf`.
- The hero portrait is stored as `public/images/hasina-headshot.webp`.
- Add verified GitHub and LinkedIn profile URLs to `src/data/profile.ts`.
- Set `NEXT_PUBLIC_SITE_URL` to your production domain for canonical metadata, robots and sitemap URLs.
