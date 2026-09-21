# رستوران کنتاکی بزرگمهر / Bozorgmehr kentucky Restaurant

Production-ready bilingual landing page for رستوران کنتاکی بزرگمهر in Mashhad.

## Project overview and tech stack

- Semantic HTML5 for the landing page and accessible navigation.
- CSS3 for responsive layout, visual theme, RTL/LTR mirroring, animations, image fallbacks, and local fonts.
- Vanilla ES6+ JavaScript with no framework, bundler, or runtime dependency.
- Persian (`fa` / `rtl`) is the default language; English (`en` / `ltr`) is available from the sticky navbar.

## Directory structure

```text
.
├── index.html                 Main bilingual landing page
├── css/
│   └── style.css              Theme, responsive layout, RTL/LTR rules, @font-face declarations
├── js/
│   ├── data.js                Translation dictionary and seven menu records
│   └── main.js                i18n runtime, persistence, menu rendering, image fallbacks
└── assets/
    ├── fonts/                 Self-hosted Vazirmatn and Inter WOFF2 files
    ├── images/                Menu photos, logo, hero, stamp, and license assets
    └── pdf/                   Seven official PDF menus
```

There are currently no separate `menu-*.html` pages; the seven menu categories are rendered from `js/data.js` and link directly to their official PDFs.

Menu cards use the prepared local food photos in `assets/images/`: `burger.png`, `pizza.png`, `crispy.png`, `pasta.png`, `sandwiches.png`, `appetizer.png`, and `drink.png`. License documents remain isolated to the credibility element.

## Relative paths and deployment

All internal HTML references use document-relative paths such as `./css/style.css`, `./js/main.js`, and `./assets/...`. CSS references are relative to `css/style.css`, for example `../assets/fonts/...`. There are no root-relative `/assets`, `/css`, or `/js` paths. This supports direct `file:///` opening, subfolders, cPanel, GitHub Pages, Netlify, Vercel, Nginx, and Apache without rewrite rules.

### Local file

Open `index.html` directly from File Explorer. Keep the `css`, `js`, and `assets` folders beside it.

### Static hosting

Upload the complete project directory while preserving the folder structure. No build command is needed.

### Nginx

```nginx
server {
    listen 80;
    server_name example.com;
    root /var/www/bozorgmehr-web;
    index index.html;
    location / { try_files $uri $uri/ =404; }
}
```

### Apache

Point the document root at the project folder. No `.htaccess` rewrite is required for the current single-page structure.

## Bilingual i18n setup

Translations live in `js/data.js` under `BOZORGMEHR_DATA.translations.fa` and `.en`. Each translatable element uses `class="i18n"` with a matching `data-i18n="key"`. To add a new string:

1. Add the same key to both language dictionaries.
2. Add `class="i18n" data-i18n="yourKey"` to the HTML element.
3. If it is dynamic content, update the relevant renderer in `js/main.js`.

The inline bootstrap in `<head>` reads `bozorgmehr-lang` before first paint, defaults it to `fa`, sets `document.documentElement.lang` and `dir`, and prevents a flash of the wrong direction. `main.js` updates all strings, menu names/descriptions, and Persian numerals when the switcher is used.

## Changelog / version history

### September 21, 2026

- Rebuilt the single-page presentation with a luxury crimson, amber, charcoal, and cream visual system.
- Added resilient sticky navigation with phone CTA, mobile drawer, bilingual switcher, hero actions, menu grid, branch cards, contact band, and social footer links.
- Consolidated About content into one heritage-led narrative and one modest credibility card, removing redundant management blocks.
- Added complete Persian-English translations for navigation, hero, menus, About, management, licensing, branches, contact, and footer.
- Added persistent language switching with dynamic `lang`/`dir` updates and early Farsi bootstrap.
- Audited internal references and standardized CSS, JavaScript, image, font, and PDF paths for local and subfolder hosting.
- Added self-hosted Vazirmatn 400/500/700/800 and Inter 400/600/800 WOFF2 files.
- Added fixed navbar logo sizing and uniform `220px` menu image presentation with `object-fit: cover`.
- Replaced license/logo menu-card sources with category-specific food photography URLs and added branded fallback cards for failed image loads.
- Added exact Neshan routing links for both branches and retained the branch phone/contact links.
- Integrated the prepared local menu photography and normalized `Sandwiches.png` to lowercase `sandwiches.png` for Linux case-sensitivity.
- Updated brand naming, story copy, branch phone numbers, and the official license carousel.
- Added a responsive official-accreditation carousel using `license-1.png`, `license-2.png`, and `license-3.png` with contained images, arrows, dots, and fixed slide dimensions.
- Updated branch contact links to `05137618434` for Shahid Montazeri and `05137638555` for Malek Abad.
- Consolidated the About section around the ۱۳۶۰ founding anchor and removed redundant executive bio copy.
- Verified JavaScript syntax, seven PDF assets, self-hosted font availability, and zero root-relative local URLs.
