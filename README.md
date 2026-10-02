# Portfolio

Personal portfolio for Kartik Dangi, built with [Astro](https://astro.build) and TypeScript.
It builds to plain static HTML and deploys to GitHub Pages: <https://kartikdangi1.github.io/Portfolio/>.

## Develop

```bash
npm install
npm run dev       # http://localhost:4321/Portfolio/
npm run build     # type-checks, then builds to dist/
npm run preview   # serve the production build
```

## Structure

```
src/
  data/        site.ts (bio, skills, links), projects.ts (all projects), i18n.ts (UI strings)
  layouts/     Base.astro (SEO tags, hreflang, theme bootstrap)
  components/  HomePage, ProjectPage, ProjectCard, Carousel, Nav, ...
  pages/       /, /de/, /projects/<id>/, /de/projects/<id>/
  scripts/     small client modules (theme, nav, typewriter, card videos, carousel, drone)
  styles/      global.css
public/assets/ images, videos, resume PDFs (served as-is)
```

English is the default language at `/`; German lives under `/de/`. Each project has its own
page with a media carousel, so it can be linked and shared on its own.

## Add or edit a project

Edit `src/data/projects.ts` and add an object to `projects`. Put media under `public/assets/`
and reference it as `"assets/..."`. A project with videos is listed above the others
automatically. If it has several videos they play one after another in a loop, on the card
and on the project page.

- Cards autoplay `preview` (a light clip) when there is one video, or the full video list when
  there are several.
- Give every video a `poster` image (used for thumbnails and before playback).
- Encode videos for the web: H.264, at most 720-1280px wide, 24-30 fps, `-movflags +faststart`.
- Prefer WebP for screenshots (`.svg` for diagrams).

## Resume

`public/assets/resume.pdf` (English) and `resume-de.pdf` (German) are web copies of the resumes
from the private `Resume` repo. They intentionally leave out the home address, phone number and
date of birth. Replace the files to update them.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: install, type-check, build, publish `dist/`.
