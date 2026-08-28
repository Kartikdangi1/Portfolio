# Portfolio site

A dependency-free (no build step, no npm install) portfolio site. Open
`index.html` directly in a browser, or serve the folder locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Adding a new project

Open `js/projects.js` and copy one of the objects in the `PROJECTS` array.
Every field is documented in the comment block at the top of that file.
Save, refresh the page — no build step.

Minimal example:

```js
{
  id: "my-new-project",
  title: "My New Project",
  tagline: "One line describing what it does",
  description: "A couple of sentences with more detail for the modal view.",
  tags: ["ROS2", "Computer Vision"],
  accent: ACCENT_PRESETS.amber,
  thumbnail: "",
  featured: false,
  links: { github: "https://github.com/you/repo", demo: "", writeup: "" },
  media: []
}
```

## Adding a video or image to a project

Add an entry to that project's `media` array — it can be a video, a YouTube
embed, or a plain image (handy for architecture diagrams or result figures
before you have footage):

**YouTube** — grab the ID from the URL (`youtube.com/watch?v=THIS_PART`):

```js
{ title: "Live demo", type: "youtube", id: "THIS_PART" }
```

**Local video file** — drop the file into `assets/videos/`, then reference it:

```js
{ title: "Training run", type: "video", src: "assets/videos/clip.mp4", poster: "assets/images/projects/clip-poster.jpg" }
```

**Image** — drop the file into `assets/images/projects/` (or point at any URL):

```js
{ title: "System architecture", type: "image", src: "assets/images/projects/diagram.png" }
```

A project can mix any number of these — they show up as tabs in the modal
that opens when the project card is clicked. A project with an empty
`media: []` array shows a friendly "coming soon" placeholder instead of a
broken player, so it's safe to add a project before you have footage.

## Adding a project thumbnail image

Drop an image into `assets/images/projects/` and set the project's
`thumbnail` field to its path, e.g. `"assets/images/projects/my-shot.jpg"`.
Leave it as `""` to use an automatic gradient card instead (color set by the
`accent` field).

## Editing your bio, skills, and contact links

All of that lives in `js/config.js` (the `SITE` object) — name, role,
tagline, about text, stats, skills list, email, and social links.

## Deploying

A GitHub Actions workflow at `.github/workflows/deploy.yml` publishes this
repo to GitHub Pages automatically on push to `main`. To enable it: repo
Settings → Pages → set "Source" to "GitHub Actions". No further
configuration needed.

You can also drag-and-drop this folder onto Netlify/Vercel, or host it on
any static file server — it's plain HTML/CSS/JS.
