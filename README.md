# Birthday Mission: Ezhil 2026

A cinematic, mobile-first birthday experience built with React, Vite, Framer Motion, and no backend. It stores progress only in the visitor's browser and includes no analytics, cookies, or data collection.

## Run locally

```bash
npm install
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

## Customize the experience

All text, dates, puzzles, gallery entries, timeline entries, the password, final letter, gift details, and audio path live in `src/data/birthdayData.js`. Edit that one file to personalize the whole experience.

Add photos to `public/images/` using the configured filenames (`memory-01.jpg`, `memory-02.jpg`, and so on). Add optional music at `public/audio/birthday.mp3`. Missing photos show a polished placeholder and missing audio simply disables the sound control.

The default secret code is configured in `birthdayData.secret.password`. Client-side passwords are suitable for a playful reveal, not for protecting sensitive information.

## Routes

- `#/` — cinematic opening and countdown
- `#/mission` — memory puzzle
- `#/memories` — photo archive and timeline
- `#/lock` — secret code
- `#/letter` — personal letter
- `#/final` — photo and gift reveal
- `#/qr` — downloadable QR code

Hash-based routing makes every route refresh-safe on GitHub Pages, Netlify, and Vercel without server rewrites. Progress is saved in `localStorage` under `birthdayMissionProgress`. A discreet “Mission controls” panel in the lower-left corner can reset it.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Create `.github/workflows/deploy.yml` with the workflow below, commit it, and push.

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: true
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

Your flow is: **GitHub repository → Vite build → GitHub Pages → open `#/qr` → download QR → send it through WhatsApp**.

## Vercel deployment

The project includes a ready-to-use `vercel.json`. It configures Vite, builds into `dist`, preserves SPA routing, and caches generated assets.

### Deploy from GitHub

1. Push this project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and select **Add New → Project**.
3. Import the GitHub repository.
4. Vercel will detect these settings automatically:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
5. Select **Deploy**.
6. Open the deployed URL and test the complete birthday flow.
7. Open `https://YOUR-PROJECT.vercel.app/#/qr` to download the final QR code.

Every push to the connected production branch will create a new deployment automatically.

### Deploy with the Vercel CLI

```bash
npm install
npm run build
npx vercel
```

For a production deployment:

```bash
npx vercel --prod
```

No environment variables, backend, database, or paid service is required.

## WhatsApp start message

```text
Hey Ezhil 👀

I made something for you.

Not a normal birthday message.

There’s a small mission waiting for you. 🎁

Scan this QR code.

No cheating.
No skipping.
And don’t ask me what happens next. 😂

Your birthday mission starts now.

— Your Best Friend ❤️
```

## HOW TO PERSONALIZE THIS FOR EZHIL

- [ ] Open `src/data/birthdayData.js`.
- [ ] Replace the sample puzzle questions, answer indexes, and hints with real shared memories.
- [ ] Change `secret.password` and its hint to something only Ezhil will recognize.
- [ ] Edit the introduction, timeline, final letter, and gift details.
- [ ] Put five optimized JPG/WebP photos in `public/images/` and verify their names match the gallery configuration.
- [ ] Optionally add `public/audio/birthday.mp3` (keep it compressed for fast mobile loading).
- [ ] Run `npm run build`, then `npm run preview` and complete the mission once on a phone.
- [ ] Deploy, visit the live `#/qr` page, download the QR image, and send it with the WhatsApp message above.
# NANBAHBD
