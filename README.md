# Terra Brasilis

A responsive catalog and brand website for Terra Brasilis Handcrafted Jewelry,
a Brazilian mother–daughter business based in Terre Haute, Indiana.

The first release is intentionally a **message-to-purchase catalog**. It gives
the brand a polished home, tells the founders' story, and lets a customer ask
about a specific piece without requiring inventory, payments, taxes, or a
custom checkout system yet.

The homepage also includes a personalized-jewelry request builder. Customers
can choose a piece type, select up to three catalog models as inspiration, add
a name, colors, theme, date, and notes, then copy the generated request and
continue through Instagram direct message first or WhatsApp second.

## Site structure

The project is a Vite multi-page site. The homepage remains the complete brand
introduction, while the primary navigation also opens five focused pages:

- `/collection/` — the complete filterable catalog
- `/story/` — the family and brand story
- `/makers/` — the handmade process and makers
- `/personalize/` — the complete personalized-jewelry request builder
- `/contact/` — Instagram, WhatsApp, and local contact information

Each route has its own HTML document, title, description, and direct URL, so it
can be opened or refreshed independently.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run audit:necklaces
npm run lint
npm run build
npm run preview
```

## Update the website

Most day-to-day content lives in these files:

- `src/data/siteContent.ts`
- `src/data/necklaceCatalog.ts`

Use it to update:

- Instagram and WhatsApp contact settings
- Necklace names, colors, metal finishes, and image mappings
- Image paths and alt text
- Navigation links

The official brand logo is stored at
`public/images/brand/official-logo.jpg` and is used by the shared header and
footer on every page.

The necklace catalog contains 170 unique named pieces and 20 grouped styling
photos. Grouped photos are attached to each necklace they contain and appear
when a visitor hovers over that product. Iracema is kept as the single listing
for the duplicate Iracema/Jurema necklace.
Confirm final availability, exact materials, prices, and policies with the
owners before publishing.

## Message-based ordering

Product inquiries offer Instagram direct message first and WhatsApp second.
Instagram cannot prefill the request, so customers can copy the prepared note
before opening the profile. To send WhatsApp visitors straight to the Terra
Brasilis chat, set `whatsappNumber` in `src/data/siteContent.ts` to digits only,
including the country code:

```ts
whatsappNumber: '18125551234',
```

Until that value is present, WhatsApp opens the prepared message and asks the
visitor to choose a recipient.

## Product photos

Web-ready necklace photos live in `public/images/products/necklaces`. The
original camera files remain outside the repository. See
`public/images/README.md` for the remaining brand-photo shot list and the batch
import workflow.

## Suggested launch path

1. Launch this catalog with Instagram-message and WhatsApp ordering.
2. Add real product data and consistent photography.
3. Track how many inquiries turn into purchases and what questions customers
   ask most often.
4. When manual ordering becomes a burden, connect a hosted commerce service or
   payment links instead of building payments from scratch.

The product data is already separated from the layout, so adding hosted
checkout links later will not require redesigning the site.

## Tech

- React 19 + TypeScript
- Vite
- Local, self-hosted Fontsource fonts
- Lucide interface icons
- Plain responsive CSS with no UI framework

No analytics, cookies, database, forms backend, or payment processing are
included in this version.
