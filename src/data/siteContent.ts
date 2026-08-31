import { braceletCatalog } from './braceletCatalog'
import { sitePath } from '../sitePath'
import type {
  CatalogEntry,
  MetalTone,
  ProductCategory,
  ProductColor,
  ProductType,
} from './catalogTypes'
import { keychainCatalog } from './keychainCatalog'
import { necklaceCatalog } from './necklaceCatalog'

export { productColors } from './catalogTypes'
export type {
  MetalTone,
  ProductCategory,
  ProductColor,
  ProductType,
} from './catalogTypes'

export type PhotoTone =
  | 'forest'
  | 'sun'
  | 'ocean'
  | 'clay'
  | 'rose'
  | 'lime'

export type PhotoAsset = {
  src: string
  alternateSrcs?: readonly string[]
  alt: string
  placeholderLabel: string
  tone: PhotoTone
}

export type Product = {
  id: string
  name: string
  type: ProductType
  category: ProductCategory
  detail: string
  colors: ProductColor[]
  metal: MetalTone
  badge?: string
  photo: PhotoAsset
}

export const siteConfig = {
  instagramHandle: '@terra_brasilis.jewlery',
  instagramUrl: 'https://www.instagram.com/terra_brasilis.jewlery/',
  instagramMessageUrl: 'https://ig.me/m/terra_brasilis.jewlery',
  location: 'Terre Haute, Indiana, USA',

  // Add digits only, including country code, to open the Terra Brasilis chat
  // directly. While blank, WhatsApp opens with the message ready to share.
  // Example: '18125551234'.
  whatsappNumber: '',
}

export const navItems = [
  { label: 'Collection', href: sitePath('/collection/') },
  { label: 'Our story', href: sitePath('/story/') },
  { label: 'The makers', href: sitePath('/makers/') },
  { label: 'Personalize', href: sitePath('/personalize/') },
  { label: 'Contact', href: sitePath('/contact/') },
]

const colorLabels: Record<ProductColor, string> = {
  black: 'Black',
  white: 'White',
  red: 'Red',
  orange: 'Orange',
  yellow: 'Yellow',
  green: 'Green',
  blue: 'Blue',
  turquoise: 'Turquoise',
  purple: 'Purple',
  pink: 'Pink',
  brown: 'Brown',
  beige: 'Beige',
  multicolor: 'Multicolor',
}

const metalLabels: Record<MetalTone, string> = {
  gold: 'Gold-tone details',
  silver: 'Silver-tone details',
  mixed: 'Mixed-metal details',
  none: 'Handmade finish',
}

function formatColors(colors: readonly ProductColor[]) {
  if (colors.includes('multicolor')) return 'Multicolor'

  const labels = colors.slice(0, 3).map((color) => colorLabels[color])
  if (labels.length < 2) return labels[0]
  if (labels.length === 2) return labels.join(' & ')

  return `${labels.slice(0, -1).join(', ')} & ${labels.at(-1)}`
}

function photoTone(colors: readonly ProductColor[]): PhotoTone {
  if (colors.includes('turquoise') || colors.includes('blue')) return 'ocean'
  if (colors.includes('orange') || colors.includes('yellow')) return 'sun'
  if (colors.includes('red') || colors.includes('pink') || colors.includes('purple')) return 'rose'
  if (colors.includes('green')) return 'forest'
  if (colors.includes('brown') || colors.includes('beige')) return 'clay'

  return 'forest'
}

type CatalogGroup = {
  type: ProductType
  category: ProductCategory
  singular: string
  folder: string
  altContext: string
  entries: readonly CatalogEntry[]
}

const catalogGroups: readonly CatalogGroup[] = [
  {
    type: 'necklace',
    category: 'Necklaces',
    singular: 'Necklace',
    folder: 'necklaces',
    altContext: 'displayed on a black jewelry bust',
    entries: necklaceCatalog,
  },
  {
    type: 'bracelet',
    category: 'Bracelets',
    singular: 'Bracelet',
    folder: 'bracelets',
    altContext: 'displayed on a white jewelry cushion',
    entries: braceletCatalog,
  },
  {
    type: 'keychain',
    category: 'Keychains',
    singular: 'Keychain',
    folder: 'keychains',
    altContext: 'styled on a wooden display',
    entries: keychainCatalog,
  },
]

export const products: Product[] = catalogGroups.flatMap((group) =>
  group.entries.map((item, index) => {
    const number = String(index + 1).padStart(3, '0')

    return {
      id: `${group.type}-${item.source}`,
      name: item.name,
      type: group.type,
      category: group.category,
      detail: `${formatColors(item.colors)} · ${metalLabels[item.metal]}`,
      colors: [...item.colors],
      metal: item.metal,
      photo: {
        src: sitePath(`/images/products/${group.folder}/${item.source}.webp`),
        alternateSrcs: item.alternateSources?.map(
          (source) => sitePath(`/images/products/${group.folder}/${source}.webp`),
        ),
        alt: `The ${item.name} handmade ${group.type} ${group.altContext}`,
        placeholderLabel: `${group.singular} ${number} · ${item.name}`,
        tone: photoTone(item.colors),
      },
    }
  }),
)

export const photos = {
  hero: {
    src: sitePath('/images/process/worn-blue-necklace.webp'),
    alt: 'A blue floral fabric-bead Terra Brasilis necklace worn in bright natural light',
    placeholderLabel: 'Blue fabric-bead necklace in natural light',
    tone: 'ocean',
  },
  story: {
    src: sitePath('/images/team/helena-yluska-story.webp'),
    alt: 'Helena and Yluska, the Brazilian daughter-and-mother team behind Terra Brasilis',
    placeholderLabel: 'Helena & Yluska · mother-and-daughter portrait',
    tone: 'ocean',
  },
  makers: {
    src: sitePath('/images/team/helena-yluska-makers.webp'),
    alt: 'Helena and Yluska together at their Terra Brasilis market booth in Terre Haute',
    placeholderLabel: 'Helena & Yluska · the makers at their booth',
    tone: 'clay',
  },
  helena: {
    src: sitePath('/images/team/helena.webp'),
    alt: 'Helena, daughter, co-owner, and maker at Terra Brasilis',
    placeholderLabel: 'Helena · co-owner & maker',
    tone: 'rose',
  },
  yluska: {
    src: sitePath('/images/team/yluska.webp'),
    alt: 'Yluska, mother, co-owner, and maker at Terra Brasilis',
    placeholderLabel: 'Yluska · co-owner & maker',
    tone: 'forest',
  },
  beads: {
    src: sitePath('/images/process/colorful-beads.webp'),
    alt: 'A colorful organizer filled with ceramic, glass, and stone-look beads for Terra Brasilis pieces',
    placeholderLabel: 'Colorful beads in the Terra Brasilis studio',
    tone: 'sun',
  },
  clayShaping: {
    src: sitePath('/images/process/shaping-clay.webp'),
    alt: 'Hands shaping and piercing a small clay bead at the Terra Brasilis worktable',
    placeholderLabel: 'Shaping a clay bead by hand',
    tone: 'clay',
  },
  clayHeart: {
    src: sitePath('/images/process/shaping-clay-heart.webp'),
    alt: 'Yluska shaping a small heart from clay with handmade forms and tools nearby',
    placeholderLabel: 'Yluska shaping a clay heart',
    tone: 'clay',
  },
  clayPieces: {
    src: sitePath('/images/process/dry-clay-charms.webp'),
    alt: 'Hand-shaped clay fish, shell, heart, and stamped beads resting before their next finish',
    placeholderLabel: 'Hand-shaped clay charms drying',
    tone: 'clay',
  },
  assemblyWorkbench: {
    src: sitePath('/images/process/assembly-workbench.webp'),
    alt: 'Yluska assembling a Terra Brasilis jewelry piece with pliers at her sunlit workbench',
    placeholderLabel: 'Yluska assembling jewelry at the workbench',
    tone: 'sun',
  },
  assemblySunlight: {
    src: sitePath('/images/process/assembly-in-sunlight.webp'),
    alt: 'Yluska selecting charms and assembling jewelry with pliers in warm natural light',
    placeholderLabel: 'Yluska assembling a piece in natural light',
    tone: 'sun',
  },
  styledCharms: {
    src: sitePath('/images/process/styled-charms.webp'),
    alt: 'Shell, coral, protective-eye, and nature-inspired charms styled with red flowers',
    placeholderLabel: 'Nature-inspired charms and flowers',
    tone: 'rose',
  },
  blueBeads: {
    src: sitePath('/images/process/styled-blue-beads.webp'),
    alt: 'Blue ceramic and stone-look focal beads arranged on wood beside red flowers',
    placeholderLabel: 'Blue focal beads inspired by nature',
    tone: 'ocean',
  },
  instagram: [
    {
      src: sitePath('/images/products/necklaces/20260825_133012.webp'),
      alt: 'The colorful Maracatu handmade necklace styled with coral flowers',
      placeholderLabel: 'Maracatu necklace',
      tone: 'forest',
    },
    {
      src: sitePath('/images/products/bracelets/20260828_145404.webp'),
      alt: 'The multicolor Aldeia Colorida handmade bracelet styled with flowers',
      placeholderLabel: 'Aldeia Colorida bracelet',
      tone: 'rose',
    },
    {
      src: sitePath('/images/products/keychains/20260828_152545.webp'),
      alt: 'The bright Mandala Solar handmade keychain styled on warm wood with flowers',
      placeholderLabel: 'Mandala Solar keychain',
      tone: 'sun',
    },
  ],
} satisfies Record<string, PhotoAsset | PhotoAsset[]>

export function inquiryMessage(piece?: string) {
  if (piece) {
    return `Hi Terra Brasilis! I saw the ${piece} on your website and would love to know if it is available.`
  }

  return 'Hi Terra Brasilis! I found you through your website and would love to learn more about your jewelry.'
}

export function contactHref(piece?: string) {
  return messageContactHref(inquiryMessage(piece))
}

export function messageContactHref(message: string) {
  const encodedMessage = encodeURIComponent(message)
  const number = siteConfig.whatsappNumber.replace(/\D/g, '')

  if (number) {
    return `https://wa.me/${number}?text=${encodedMessage}`
  }

  return `https://wa.me/?text=${encodedMessage}`
}
