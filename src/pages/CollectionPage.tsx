import { useMemo, useState } from 'react'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'
import { InquiryDialog } from '../components/InquiryDialog'
import { InteriorPageShell } from '../components/InteriorPageShell'
import { PhotoFrame } from '../components/PhotoFrame'
import { products } from '../data/siteContent'

const categories = [
  'All',
  'Necklaces',
  'Bracelets',
  'Anklets',
  'Accessories',
] as const

type Category = (typeof categories)[number]

export function CollectionPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [inquiryPiece, setInquiryPiece] = useState<string | null>(null)

  const visibleProducts = useMemo(
    () =>
      activeCategory === 'All'
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  )

  return (
    <InteriorPageShell activePage="collection">
      <header className="page-hero page-hero--collection">
        <div className="section-shell page-hero__inner">
          <div className="page-hero__copy">
            <p className="eyebrow">The collection</p>
            <h1>Small-batch color, made to be noticed.</h1>
            <p>
              Explore handcrafted necklaces, bracelets, anklets, and playful
              accessories inspired by Brazilian color and joy.
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

          <div
            className="collection-filters page-collection__filters"
            aria-label="Filter the collection by jewelry type"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={activeCategory === category ? 'is-active' : ''}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <p className="page-collection__result-count" aria-live="polite">
            Showing {visibleProducts.length}{' '}
            {visibleProducts.length === 1 ? 'piece' : 'pieces'}
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
