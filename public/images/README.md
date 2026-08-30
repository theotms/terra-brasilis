# Image replacement guide

The website works without images: every empty `src` in
`src/data/siteContent.ts` becomes a styled placeholder with a shot label.

To add a photo:

1. Export it as WebP when possible (JPEG also works).
2. Put it in the matching folder below.
3. Open `src/data/siteContent.ts` and replace the empty `src: ''` with its
   public path, such as `src: '/images/hero/hero-founders.webp'`.
4. Update the `alt` text so it accurately describes the finished photo.

Do not import files from `public`. Paths always begin with `/images/`.

## Product catalog

The live catalog uses optimized WebP files from `products/necklaces/`,
`products/bracelets/`, and `products/keychains/`. Names, colors, metal finishes,
and source filenames are mapped in the matching catalog file under `src/data/`.

Each product uses `source` for its primary image. When another photo shows the
same product or several products together, that image is listed in
`alternateSources` on every matching primary product and appears as its hover
view instead of becoming another card.

To prepare another folder of camera JPEGs, run:

```bash
node scripts/prepare-necklaces.mjs <input-folder> public/images/products/<type> <contact-sheet-folder>
npm run audit:catalog
```

The importer auto-rotates camera images, limits them to 1200×1600, creates
WebP copies, and produces numbered contact sheets for visual cataloging. Keep
the original camera files outside the repository.

## Recommended brand files

| Folder | Suggested filename | Crop / minimum size | Shot |
| --- | --- | --- | --- |
| `hero/` | `hero-founders.webp` | 3:2 landscape, 2400×1600 | Helena and Yluska creating, arranging, or wearing jewelry in warm natural light |
| `story/` | `about-founders.webp` | 4:5 portrait, 1600×2000 | Mother and daughter together, both wearing pieces |
| `story/` | `process-hands.webp` | 4:5 portrait, 1600×2000 | Hands assembling beads or textile details |
| `story/` | `process-detail.webp` | 4:5 portrait, 1600×2000 | Beads, tools, cords, charms, and color selection |
| `instagram/` | `instagram-01.webp` through `instagram-03.webp` | Square, 1080×1080 | Product flat lay, jewelry being worn, and behind the scenes |

## Product-photo checklist

For each piece, aim to capture:

- A clean front view
- A macro/detail view
- A worn or in-use view for scale
- The clasp, attachment, or back when relevant

Use consistent natural light and a warm cream, subtle wood, or softly colored
background. Leave a little negative space around the piece so responsive crops
have room to work.

## Current data mapping

- `photos.hero` → `hero/hero-founders.webp`
- `photos.story` → `story/about-founders.webp`
- `photos.makers` → `story/process-hands.webp`
- `photos.detail` → `story/process-detail.webp`
- `photos.instagram[0..2]` → `instagram/instagram-01..03.webp`
- `necklaceCatalog` → `products/necklaces/*.webp`
- `braceletCatalog` → `products/bracelets/*.webp`
- `keychainCatalog` → `products/keychains/*.webp`

When the collection grows, add the optimized image and its metadata entry to
the matching file in `src/data/`; the grids and filters update automatically.
