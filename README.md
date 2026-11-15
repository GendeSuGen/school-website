# Riverside College website

A static college website (Home, About, Blog, Events, Requirements for enrollees and transferees). There is **no database**: all content is JSON and Markdown files in `content/`.

## Editing content

| File | What it controls |
| --- | --- |
| `content/site.json` | College name, tagline, Home hero, About page, contact details |
| `content/events.json` | Events. They move from Upcoming to Past automatically after their date |
| `content/posts.json` | Blog post details (title, date, author, category, summary) |
| `content/posts/*.md` | The body of each blog post (`body` in `posts.json` names the file) |
| `content/requirements-enrollees.json` | Enrollee requirements |
| `content/requirements-transferees.json` | Transferee requirements |

Images go in `public/images/` and PDF forms in `public/forms/`. Reference them by path, for example `"formPdf": "/forms/admission-form.pdf"`.

Every file is validated when the site is built. A mistake (wrong date format, missing field, duplicate slug, missing Markdown file) fails the build with a message naming the file and field, so a bad edit can't go live.

## Commands

```bash
npm install
npm run dev          # local preview at http://localhost:3000
npm test             # unit tests (content validation, event sorting)
npm run test:build   # production build + checks on the generated pages
npm run typecheck
```

`npm run build` writes the finished site to `out/`. Upload that folder to any static host (Vercel, Netlify, GitHub Pages).

Set `NEXT_PUBLIC_SITE_URL` (for example `https://www.riverside.example`) when building so the sitemap and share links use the real domain.

The Upcoming and Past event split uses the build date, so rebuild the site daily (a scheduled deploy) to keep it current.

## Branding

Colors are CSS variables at the top of `src/app/globals.css`.
