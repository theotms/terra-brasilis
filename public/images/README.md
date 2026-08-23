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

## Recommended files

| Folder | Suggested filename | Crop / minimum size | Shot |
| --- | --- | --- | --- |
| `hero/` | `hero-founders.webp` | 3:2 landscape, 2400×1600 | Helena and Yluska creating, arranging, or wearing jewelry in warm natural light |
| `story/` | `about-founders.webp` | 4:5 portrait, 1600×2000 | Mother and daughter together, both wearing pieces |
| `story/` | `process-hands.webp` | 4:5 portrait, 1600×2000 | Hands assembling beads or textile details |
| `story/` | `process-detail.webp` | 4:5 portrait, 1600×2000 | Beads, tools, cords, charms, and color selection |
| `products/` | `product-01.webp` through `product-06.webp` | 4:5 portrait, 1600×2000 | One clean product or worn detail per card |
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
- `products[0..5].photo` → `products/product-01..06.webp`

If the collection grows, duplicate a product object in
`src/data/siteContent.ts`; the grid and filters update automatically.
