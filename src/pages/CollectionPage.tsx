import { useMemo, useState } from 'react'
import { ArrowRight, MessageCircle, RotateCcw, Sparkles } from 'lucide-react'
import { InquiryDialog } from '../components/InquiryDialog'
import { InteriorPageShell } from '../components/InteriorPageShell'
import { PhotoFrame } from '../components/PhotoFrame'
import {
  products,
  type ProductColor,
  type ProductType,
} from '../data/siteContent'

const colorOptions: {
  value: ProductColor
  label: string
  swatch: string
}[] = [
  { value: 'black', label: 'Black', swatch: '#191c1a' },
  { value: 'white', label: 'White', swatch: '#fffefa' },
  { value: 'red', label: 'Red', swatch: '#b63c32' },
  { value: 'orange', label: 'Orange', swatch: '#d87537' },
  { value: 'yellow', label: 'Yellow', swatch: '#e0bd3e' },
  { value: 'green', label: 'Green', swatch: '#34704b' },
  { value: 'blue', label: 'Blue', swatch: '#315fa4' },
  { value: 'turquoise', label: 'Turquoise', swatch: '#39a7a5' },
  { value: 'purple', label: 'Purple', swatch: '#744b94' },
  { value: 'pink', label: 'Pink', swatch: '#d9788c' },
  { value: 'brown', label: 'Brown', swatch: '#76513c' },
  { value: 'beige', label: 'Beige', swatch: '#d8c6a1' },
  {
    value: 'multicolor',
    label: 'Multicolor',
    swatch: 'linear-gradient(135deg, #b63c32 0 25%, #e0bd3e 25% 50%, #34704b 50% 75%, #315fa4 75%)',
  },
]

const metalOptions = [
  { value: 'any', label: 'Any finish' },
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' },
] as const

type MetalFilter = (typeof metalOptions)[number]['value']

const productTypeOptions: {
  value: 'any' | ProductType
  label: string
}[] = [
  { value: 'any', label: 'All pieces' },
  { value: 'necklace', label: 'Necklaces' },
  { value: 'bracelet', label: 'Bracelets' },
  { value: 'keychain', label: 'Keychains' },
]

type ProductTypeFilter = (typeof productTypeOptions)[number]['value']

export function CollectionPage() {
  const [productTypeFilter, setProductTypeFilter] =
    useState<ProductTypeFilter>('any')
  const [selectedColors, setSelectedColors] = useState<ProductColor[]>([])
  const [metalFilter, setMetalFilter] = useState<MetalFilter>('any')
  const [inquiryPiece, setInquiryPiece] = useState<string | null>(null)

  const visibleProducts = useMemo(
    () => products.filter((product) => {
      const matchesType =
        productTypeFilter === 'any' || product.type === productTypeFilter
      const matchesColor =
        selectedColors.length === 0 ||
        selectedColors.some((color) => product.colors.includes(color))
      const matchesMetal =
        metalFilter === 'any' ||
        product.metal === metalFilter ||
        product.metal === 'mixed'

      return matchesType && matchesColor && matchesMetal
    }),
    [metalFilter, productTypeFilter, selectedColors],
  )

  const hasActiveFilters =
    productTypeFilter !== 'any' ||
    selectedColors.length > 0 ||
    metalFilter !== 'any'

  function toggleColor(color: ProductColor) {
    setSelectedColors((current) =>
      current.includes(color)
        ? current.filter((item) => item !== color)
        : [...current, color],
    )
  }

  function clearFilters() {
    setProductTypeFilter('any')
    setSelectedColors([])
    setMetalFilter('any')
  }

  return (
    <InteriorPageShell activePage="collection">
      <header className="page-hero page-hero--collection">
        <div className="section-shell page-hero__inner">
          <div className="page-hero__copy">
            <p className="eyebrow">The collection</p>
            <h1>Small-batch color, made to be noticed.</h1>
            <p>
              Explore {products.length} handcrafted necklaces, bracelets, and
              keychains, each with its own Brazilian Portuguese name inspired
              by color, culture, fauna, and flora.
            </p>
          </div>
          <p className="page-hero__note">
            Every piece is made in small quantities. Message us on Instagram
            first, or use WhatsApp for availability, pricing, and purchase
            details.
          </p>
        </div>
      </header>

      <section
          className="page-collection section-shell"
          aria-labelledby="collection-grid-title"
        >
          <div className="page-section-heading">
            <div>
              <p className="eyebrow">Find your favorite</p>
              <h2 id="collection-grid-title">Made by hand, one piece at a time.</h2>
            </div>
            <a className="text-link" href="/personalize/">
              Create something personal
              <Sparkles aria-hidden="true" />
            </a>
          </div>

          <div className="catalog-filters page-collection__filters">
            <div className="catalog-filters__heading">
              <div>
                <p className="eyebrow">Filter the collection</p>
                <p>Choose a product type, any colors you like, and a finish.</p>
              </div>
              <button
                className="catalog-filters__clear"
                type="button"
                disabled={!hasActiveFilters}
                onClick={clearFilters}
              >
                <RotateCcw aria-hidden="true" />
                Clear filters
              </button>
            </div>

            <div className="catalog-filters__groups">
              <fieldset className="catalog-filter-group catalog-filter-group--type">
                <legend>Product type</legend>
                <div className="catalog-type-options">
                  {productTypeOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={productTypeFilter === option.value ? 'is-active' : ''}
                      aria-pressed={productTypeFilter === option.value}
                      onClick={() => setProductTypeFilter(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="catalog-filter-group">
                <legend>Color</legend>
                <div className="catalog-color-options">
                  {colorOptions.map((color) => {
                    const selected = selectedColors.includes(color.value)

                    return (
                      <button
                        key={color.value}
                        type="button"
                        className={selected ? 'is-active' : ''}
                        aria-pressed={selected}
                        onClick={() => toggleColor(color.value)}
                      >
                        <span
                          className="catalog-color-swatch"
                          style={{ background: color.swatch }}
                          aria-hidden="true"
                        />
                        {color.label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              <fieldset className="catalog-filter-group catalog-filter-group--metal">
                <legend>Metal finish</legend>
                <div className="catalog-metal-options">
                  {metalOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={metalFilter === option.value ? 'is-active' : ''}
                      aria-pressed={metalFilter === option.value}
                      onClick={() => setMetalFilter(option.value)}
                    >
                      <span aria-hidden="true" />
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>

          <p className="page-collection__result-count" aria-live="polite">
            Showing {visibleProducts.length}{' '}
            {visibleProducts.length === 1 ? 'piece' : 'pieces'}
            {hasActiveFilters ? ' matching your filters' : ''}
          </p>

          <div className="product-grid page-collection__grid">
            {visibleProducts.map((product) => (
              <article className="product-card page-product-card" key={product.id}>
                <div className="product-card__visual">
                  <PhotoFrame photo={product.photo} />
                  {product.badge && (
                    <span className="product-card__badge">{product.badge}</span>
                  )}
                  <button
                    className="product-card__quick"
                    type="button"
                    onClick={() => setInquiryPiece(product.name)}
                    aria-label={`Ask about this piece: ${product.name}`}
                  >
                    <MessageCircle aria-hidden="true" />
                    Ask about this piece
                  </button>
                </div>
                <div className="product-card__info">
                  <div>
                    <p>{product.category}</p>
                    <h3>{product.name}</h3>
                    <span>{product.detail}</span>
                  </div>
                  <div className="product-card__actions page-product-card__actions">
                    <a
                      className="product-card__personalize"
                      href={`/personalize/?references=${encodeURIComponent(product.id)}`}
                      aria-label={`Use as inspiration for a personalized piece: ${product.name}`}
                    >
                      <Sparkles aria-hidden="true" />
                      Use as inspiration
                    </a>
                    <button
                      className="round-arrow"
                      type="button"
                      onClick={() => setInquiryPiece(product.name)}
                      aria-label={`Inquire about ${product.name}`}
                    >
                      <ArrowRight aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
            {visibleProducts.length === 0 && (
              <div className="catalog-empty-state">
                <p className="eyebrow">No exact match</p>
                <h3>Try another color or finish.</h3>
                <p>
                  Every necklace is one of a kind, so a broader filter may reveal
                  something unexpected.
                </p>
                <button className="button button--coral" type="button" onClick={clearFilters}>
                  Clear filters
                  <RotateCcw aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
      </section>

      <section className="page-callout page-callout--collection">
          <div className="section-shell page-callout__inner">
            <div>
              <p className="eyebrow">Made with you in mind</p>
              <h2>Love the feeling, but want your own details?</h2>
              <p>
                Choose up to three models as inspiration, then tell us your
                preferred jewelry type, colors, name, or theme.
              </p>
            </div>
            <a className="button button--coral" href="/personalize/">
              Personalize a piece
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
      </section>

      <InquiryDialog
        piece={inquiryPiece}
        onClose={() => setInquiryPiece(null)}
      />
    </InteriorPageShell>
  )
}

export default CollectionPage
