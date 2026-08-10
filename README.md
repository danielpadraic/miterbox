# MITERBOX

High-end single-page site for MITERBOX — custom cabinetry & artisan carpentry in Nampa, Idaho.

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hook Form + Zod

## Requirements

- Node.js 20+

## Getting started

```bash
nvm use   # if you use nvm — reads .nvmrc
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing content

| What | Where |
| --- | --- |
| Gallery projects | `src/data/projects.ts` |
| Project photos | `public/gallery/` |
| Logo | `public/logo.png` |
| Contact delivery | `src/app/api/contact/route.ts` + `.env.local` |

### Contact form (email + SMS)

The floating “Start a Conversation” button and the page contact section both post to `/api/contact`.

1. Copy `.env.example` → `.env.local`
2. Add your **Resend** API key + from-address
3. Add your **Twilio** SID, auth token, Twilio from-number, and Phil’s phone number (`PHIL_PHONE_NUMBER`)

In development, if keys are missing, submissions are logged to the server console so you can still test the UI.

### Optional project video

In `src/data/projects.ts`, set `video: "/gallery/your-clip.mp4"` on any project. The lightbox will play it with the still image as poster.
