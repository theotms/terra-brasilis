import {
  necklaceCatalog,
  type MetalTone,
  type NecklaceColor,
} from './necklaceCatalog'

export { necklaceColors } from './necklaceCatalog'
export type { MetalTone, NecklaceColor } from './necklaceCatalog'

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
  category: 'Necklaces' | 'Bracelets' | 'Anklets' | 'Accessories'
  detail: string
  colors: NecklaceColor[]
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
  { label: 'Collection', href: '/collection/' },
  { label: 'Our story', href: '/story/' },
  { label: 'The makers', href: '/makers/' },
  { label: 'Personalize', href: '/personalize/' },
  { label: 'Contact', href: '/contact/' },
]

const colorLabels: Record<NecklaceColor, string> = {
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
  none: 'Beaded finish',
}

function formatColors(colors: readonly NecklaceColor[]) {
  if (colors.includes('multicolor')) return 'Multicolor'

  const labels = colors.slice(0, 3).map((color) => colorLabels[color])
  if (labels.length < 2) return labels[0]
  if (labels.length === 2) return labels.join(' & ')

  return `${labels.slice(0, -1).join(', ')} & ${labels.at(-1)}`
}

function photoTone(colors: readonly NecklaceColor[]): PhotoTone {
  if (colors.includes('turquoise') || colors.includes('blue')) return 'ocean'
  if (colors.includes('orange') || colors.includes('yellow')) return 'sun'
  if (colors.includes('red') || colors.includes('pink') || colors.includes('purple')) return 'rose'
  if (colors.includes('green')) return 'forest'
  if (colors.includes('brown') || colors.includes('beige')) return 'clay'

  return 'forest'
}

export const products: Product[] = necklaceCatalog.map((necklace, index) => {
  const number = String(index + 1).padStart(3, '0')

  return {
    id: `necklace-${necklace.source}`,
    name: necklace.name,
    category: 'Necklaces',
    detail: `${formatColors(necklace.colors)} · ${metalLabels[necklace.metal]}`,
    colors: [...necklace.colors],
    metal: necklace.metal,
    photo: {
      src: `/images/products/necklaces/${necklace.source}.webp`,
      alternateSrcs: necklace.alternateSources?.map(
        (source) => `/images/products/necklaces/${source}.webp`,
      ),
      alt: `The ${necklace.name} handmade necklace displayed on a black jewelry bust`,
      placeholderLabel: `Necklace ${number} · ${necklace.name}`,
      tone: photoTone(necklace.colors),
    },
  }
})

export const photos = {
  hero: {
    src: '',
    alt: 'Colorful Terra Brasilis jewelry styled in warm sunlight',
    placeholderLabel: 'Hero photo · jewelry worn in warm sunlight',
    tone: 'sun',
  },
  story: {
    src: '',
    alt: 'The Brazilian mother and daughter behind Terra Brasilis',
    placeholderLabel: 'Story photo · mother & daughter portrait',
    tone: 'ocean',
  },
  makers: {
    src: '',
    alt: 'The Terra Brasilis makers working together at their table',
    placeholderLabel: 'Makers photo · hands at the worktable',
    tone: 'clay',
  },
  detail: {
    src: '',
    alt: 'Close-up of the handwork in a Terra Brasilis jewelry piece',
    placeholderLabel: 'Detail photo · beads, texture & tools',
    tone: 'lime',
  },
  instagram: [
    {
      src: '',
      alt: 'A colorful Terra Brasilis necklace from Instagram',
      placeholderLabel: 'Instagram 01 · product flat lay',
      tone: 'forest',
    },
    {
      src: '',
      alt: 'A customer wearing Terra Brasilis jewelry',
      placeholderLabel: 'Instagram 02 · jewelry in motion',
      tone: 'rose',
    },
    {
      src: '',
      alt: 'A behind-the-scenes look at Terra Brasilis jewelry making',
      placeholderLabel: 'Instagram 03 · behind the scenes',
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
