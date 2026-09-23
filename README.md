# Malsha Pathirana — Portfolio

A modern, responsive personal portfolio built with plain HTML5, CSS3 and JavaScript. No build step, no framework — open it in VS Code and it just runs.

## Run it

- Easiest: install the **Live Server** extension in VS Code, right-click `index.html` → **Open with Live Server**.
- Or just double-click `index.html` to open it directly in a browser (a few things, like `fetch`-based features, aren't used here so this works fine too).

## Folder structure

```
portfolio/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   │   ├── profile.svg          ← placeholder, replace with your real photo
│   │   ├── projects/            ← placeholder project thumbnails
│   │   └── certificates/        ← empty, add certificate images/PDFs here
│   └── cv/
│       └── Malsha-Pathirana-CV.pdf   ← your real CV, already wired up
└── README.md
```

## Things to customize before you publish this

These are placeholder (`#`) links right now — search `js/script.js` and `index.html` for `href="#"` to find every one:

1. **GitHub profile URL** — in the navbar, hero socials, contact section and footer.
2. **LinkedIn profile URL** — same locations as above.
3. **Project GitHub repo links** — in the `projects` array in `js/script.js`. FoodHub and InternHub already link to your real Figma prototypes (`bit.ly` links from your CV); only the Hotel Management System link is still a placeholder.
4. **Certificate links** — in the `certs` array in `js/script.js`, point each `link` to the real certificate file or credential page.
5. **Profile photo** — replace `assets/images/profile.svg` with a real photo. Easiest: add `profile.jpg` to `assets/images/`, then in `index.html` change the `<img src="assets/images/profile.svg" ...>` line to point to it.
6. **Project screenshots** — replace the SVGs in `assets/images/projects/` with real screenshots of your Hotel Management System, FoodHub and InternHub work (keep the same file names or update the paths in `js/script.js`).

## Notes

- Dark/light mode is saved in the browser via `localStorage`, so it's remembered on refresh.
- Project cards and certification cards are pagination-driven from the arrays at the top of `js/script.js` — add a new project or certificate by adding an object to the array, no HTML editing needed.
- The contact form does client-side validation only; wire it up to a form backend (e.g. Formspree) or your own endpoint when you're ready to receive real messages.
