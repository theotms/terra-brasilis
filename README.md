# Terra Brasilis

A responsive catalog and brand website for Terra Brasilis Handcrafted Jewelry,
a Brazilian mother–daughter business based in Terre Haute, Indiana.

The first release is intentionally a **message-to-purchase catalog**. It gives
the brand a polished home, tells the founders' story, and lets a customer ask
about a specific piece without requiring inventory, payments, taxes, or a
custom checkout system yet.

## Run locally

```bash
npm install
npm run dev
```

Production checks:

```bash
npm run lint
npm run build
npm run preview
```

## Update the website

Most day-to-day content lives in one file:

- `src/data/siteContent.ts`

Use it to update:

- Instagram and WhatsApp contact settings
- Product names, categories, labels, and descriptions
- Image paths and alt text
- Navigation links

The sample catalog entries are placeholders based on product types currently
shown publicly by Terra Brasilis. Confirm all final names, availability,
materials, prices, and policies with the owners before publishing.

## Turn on WhatsApp ordering

The live fallback is currently Instagram because no WhatsApp number has been
provided. In `src/data/siteContent.ts`, set `whatsappNumber` to digits only,
including the country code:

```ts
whatsappNumber: '18125551234',
```

Once that value is present, every product inquiry and contact button switches
to WhatsApp automatically and includes a prewritten message with the product
name.

## Add real photos

See `public/images/README.md` for the shot list, sizes, filenames, and exact
replacement instructions. Until a path is supplied, the site renders a
colorful, labeled placeholder in the final photo's position.

## Suggested launch path

1. Launch this catalog with Instagram or WhatsApp ordering.
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
