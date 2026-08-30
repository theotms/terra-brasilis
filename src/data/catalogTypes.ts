export const productColors = [
  'black',
  'white',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'turquoise',
  'purple',
  'pink',
  'brown',
  'beige',
  'multicolor',
] as const

export type ProductColor = (typeof productColors)[number]
export type MetalTone = 'gold' | 'silver' | 'mixed' | 'none'
export type ProductType = 'necklace' | 'bracelet' | 'keychain'
export type ProductCategory = 'Necklaces' | 'Bracelets' | 'Keychains'

export type CatalogEntry = {
  source: string
  name: string
  colors: readonly ProductColor[]
  metal: MetalTone
  alternateSources?: readonly string[]
}
