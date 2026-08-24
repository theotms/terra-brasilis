export type PhotoTone =
  | 'forest'
  | 'sun'
  | 'ocean'
  | 'clay'
  | 'rose'
  | 'lime'

export type PhotoAsset = {
  src: string
  alt: string
  placeholderLabel: string
  tone: PhotoTone
}

export type Product = {
  id: string
  name: string
  category: 'Necklaces' | 'Bracelets' | 'Anklets' | 'Accessories'
  detail: string
  badge?: string
  photo: PhotoAsset
}

export const siteConfig = {
  instagramHandle: '@terra_brasilis.jewlery',
  instagramUrl: 'https://www.instagram.com/terra_brasilis.jewlery/',
  location: 'Terre Haute, Indiana',

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
  { label: 'Contact', href: '/#contact' },
]

// These are sample catalog entries. Replace their names and details with the
// real collection when photography is ready.
export const products: Product[] = [
  {
    id: 'color-story-necklace',
    name: 'Color Story Necklace',
    category: 'Necklaces',
    detail: 'Joyful color · handmade slowly',
    badge: 'New',
    photo: {
      src: '',
      alt: 'A colorful handmade beaded necklace',
      placeholderLabel: 'Product 01 · necklace on warm linen',
      tone: 'sun',
    },
  },
  {
    id: 'textile-amulet',
    name: 'Textile Amulet',
    category: 'Necklaces',
    detail: 'Crocheted detail · one of a kind',
    photo: {
      src: '',
      alt: 'A handmade textile amulet necklace',
      placeholderLabel: 'Product 02 · amulet close-up',
      tone: 'ocean',
    },
  },
  {
    id: 'bracelet-stack',
    name: 'Colorful Bracelet Stack',
    category: 'Bracelets',
    detail: 'Mix, layer, make it yours',
    badge: 'One of one',
    photo: {
      src: '',
      alt: 'A stack of colorful handmade bracelets',
      placeholderLabel: 'Product 03 · bracelets being worn',
      tone: 'rose',
    },
  },
  {
    id: 'summer-anklet',
    name: 'Summer Anklet',
    category: 'Anklets',
    detail: 'Bright beads · made for sunshine',
    photo: {
      src: '',
      alt: 'A colorful handmade beaded anklet',
      placeholderLabel: 'Product 04 · anklet in motion',
      tone: 'lime',
    },
  },
  {
    id: 'personalized-keychain',
    name: 'Personalized Keychain',
    category: 'Accessories',
    detail: 'Custom letters · made for you',
    photo: {
      src: '',
      alt: 'A personalized handmade beaded keychain',
      placeholderLabel: 'Product 05 · custom keychain',
      tone: 'clay',
    },
  },
  {
    id: 'beaded-bag-charm',
    name: 'Beaded Bag Charm',
    category: 'Accessories',
    detail: 'Playful color · personalized detail',
    photo: {
      src: '',
      alt: 'A colorful handmade beaded bag charm',
      placeholderLabel: 'Product 06 · charm on a bag',
      tone: 'forest',
    },
  },
]

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

export const contactChannel = 'WhatsApp'
