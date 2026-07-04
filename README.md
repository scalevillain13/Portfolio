# Александр — Portfolio

Premium personal developer portfolio built with React, TypeScript, Vite, and Framer Motion.

**Live:** [https://scalevillain13.github.io/Portfolio/](https://scalevillain13.github.io/Portfolio/)

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This project uses relative asset paths (`base: './'`) so it works on GitHub Pages project sites.

### GitHub Actions (recommended)

1. Create a repo named **Portfolio** on GitHub (`scalevillain13/Portfolio`).
2. Push this code to the `main` branch.
3. Go to **Settings → Pages → Build and deployment**.
4. Set **Source** to **GitHub Actions**.
5. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

Site URL: `https://scalevillain13.github.io/Portfolio/`

### Manual deploy (alternative)

```bash
npm run deploy
```

Then in **Settings → Pages**, set source to the `gh-pages` branch.

## Stack

- React 19 + TypeScript
- Vite 8
- Framer Motion — animations & scroll reveals
- Lenis — smooth scrolling
- Syne + Instrument Serif — typography
