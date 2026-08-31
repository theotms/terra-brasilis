# Image replacement guide

The website can still display a styled placeholder whenever a photo has an
empty `src` in `src/data/siteContent.ts`.

To add a photo:

1. Export it as WebP when possible (JPEG also works).
2. Put it in the matching folder below.
3. Open `src/data/siteContent.ts` and set its public path with `sitePath`, such
   as `src: sitePath('/images/process/new-workbench-photo.webp')`.
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

## Brand and process files

| Folder | Suggested filename | Crop / minimum size | Shot |
| --- | --- | --- | --- |
| `team/` | `helena.webp`, `yluska.webp` | 4:5 portrait, 1600×2000 | Individual and mother-and-daughter portraits |
| `process/` | descriptive `.webp` name | 4:5 portrait, 1600×2000 | Clay shaping, hands assembling, beads, tools, or styled materials |
| `products/` | original camera source name | 3:4 portrait, 1200×1600 | Individual necklaces, bracelets, and keychains |

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

- `photos.hero` → `process/worn-blue-necklace.webp`
- `photos.story`, `photos.makers`, `photos.helena`, `photos.yluska` → `team/*.webp`
- Process, clay, charm, and bead photo entries → `process/*.webp`
- `photos.instagram[0..2]` → selected `products/*/*.webp` images
- `necklaceCatalog` → `products/necklaces/*.webp`
- `braceletCatalog` → `products/bracelets/*.webp`
- `keychainCatalog` → `products/keychains/*.webp`

When the collection grows, add the optimized image and its metadata entry to
the matching file in `src/data/`; the grids and filters update automatically.
