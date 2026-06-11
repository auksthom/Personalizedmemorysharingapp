# Personalized Memory Sharing App ("Remember Us")

A farewell site for a colleague: pick a mood (Happy / Sad / Miserable), then tap on
people's faces to watch their personal video message.

This is a Vite + React + Tailwind project, originally generated from a Figma design at
https://www.figma.com/design/uKe6LC2ng90Wwu757JbHLO/Personalized-Memory-Sharing-App.

## Running locally

```
npm install
npm run dev
```

Then open the printed local URL (works on your phone too if it's on the same Wi-Fi —
use the "Network" address Vite prints).

## Adding people, photos, and videos

All content lives in `src/app/data/people.ts`.

- Each person has an `id`, `name`, `role`, `photo`, and a `messages` object with one
  entry per mood (`happy`, `sad`, `miserable`), each containing a `message` (text shown
  in the modal), a `video` path, and a `duration` label.
- Photos go in `public/media/photos/<id>.jpg` (e.g. `public/media/photos/1.jpg`).
- Videos go in `public/media/videos/<id>_<mood>.mp4` (e.g. `public/media/videos/1_happy.mp4`).
- If a photo or video is missing, a placeholder image is shown instead — so the site
  still works while you're filling in real content.

Keep videos compressed (ideally under ~15-20MB each, H.264 .mp4) so they load quickly
on mobile data.

## Mood flow

- On load, visitors pick a mood (Happy / Sad / Miserable) on the gate screen.
- The People section then shows everyone's mood-specific message and video.
- "Change mood" returns to the mood gate.
- "View all people" / "Skip" shows everyone regardless of mood (using the happy
  message/video as the default).

## Deploying

Push to GitHub, then import the repo in Vercel (Framework preset: Vite). No extra
config needed — `npm run build` outputs to `dist/`.
