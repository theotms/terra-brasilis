import { useEffect, useMemo, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  Heart,
  MapPin,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react'
import { Brand } from './components/Brand'
import { AnnouncementBar } from './components/AnnouncementBar'
import { InstagramIcon } from './components/InstagramIcon'
import { InquiryDialog } from './components/InquiryDialog'
import { PersonalizeSection } from './components/PersonalizeSection'
import { PhotoFrame } from './components/PhotoFrame'
import {
  contactChannel,
  contactHref,
  navItems,
  photos,
  products,
  siteConfig,
} from './data/siteContent'

const categories = [
  'All',
  'Necklaces',
  'Bracelets',
  'Anklets',
  'Accessories',
] as const

type Category = (typeof categories)[number]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('All')
  const [inquiryPiece, setInquiryPiece] = useState<string | null>(null)
  const [personalizationReferences, setPersonalizationReferences] = useState<
    string[]
  >([])
  const [personalizationNotice, setPersonalizationNotice] = useState('')

  const visibleProducts = useMemo(
    () =>
      activeCategory === 'All'
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory],
  )

  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return

    let cancelled = false

    document.fonts.ready.then(() => {
      window.requestAnimationFrame(() => {
        if (!cancelled) document.getElementById(targetId)?.scrollIntoView()
      })
    })

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)
    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  return (
    <>
      <AnnouncementBar />

      <header className="site-header">
        <div className="site-header__inner">
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.slice(0, 4).map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <a className="site-header__brand" href="/" aria-label="Terra Brasilis home">
            <Brand compact inverse />
          </a>

          <div className="site-header__actions">
            <a className="header-contact" href="/contact/">
              Let&apos;s talk
              <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <button
              className="icon-button menu-button"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            className="mobile-nav"
            id="mobile-navigation"
            aria-label="Mobile navigation"
          >
            <p className="eyebrow">Explore</p>
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
              >
                <span>0{index + 1}</span>
                {item.label}
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
            <a
              className="mobile-nav__instagram"
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
              {siteConfig.instagramHandle}
            </a>
          </nav>
        )}
      </header>

      <main id="main-content">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__content">
            <div className="hero__content-inner">
              <p className="eyebrow hero__eyebrow">Feito à mão · made with soul</p>
              <h1 id="hero-title">
                Jewelry with a Brazilian <em>heartbeat.</em>
              </h1>
              <p className="hero__lede">
                Expressive, handcrafted pieces shaped by color, memory, and
                the joy of our Brazilian roots.
              </p>
              <div className="hero__buttons">
                <a className="button button--light" href="/collection/">
                  Explore the collection
                  <ArrowRight aria-hidden="true" />
                </a>
                <a
                  className="button button--hero-personalize"
                  href="/personalize/"
                >
                  Personalize a piece
                  <Sparkles aria-hidden="true" />
                </a>
                <a className="text-link text-link--light" href="/story/">
                  Meet the family
                </a>
              </div>
              <p className="hero__location">
                <MapPin size={16} aria-hidden="true" />
                Handmade in {siteConfig.location}
              </p>
            </div>
            <span className="hero__sun" aria-hidden="true" />
            <span className="hero__scribble" aria-hidden="true">amor</span>
          </div>

          <div className="hero__visual">
            <PhotoFrame photo={photos.hero} className="hero__photo" eager />
            <div className="hero__stamp" aria-hidden="true">
              <span>Terra Brasilis</span>
              <Heart fill="currentColor" />
              <span>From us to you</span>
            </div>
            <div className="hero__caption">
              <span>Color you can feel</span>
              <span>01 — 06</span>
            </div>
          </div>
        </section>

        <section className="values-strip" aria-label="What makes Terra Brasilis special">
          <div>
            <span>01</span>
            <p>Crafted by hand</p>
          </div>
          <div>
            <span>02</span>
            <p>Rooted in Brazil</p>
          </div>
          <div>
            <span>03</span>
            <p>Made in small quantities</p>
          </div>
          <div>
            <span>04</span>
            <p>Mother–daughter owned</p>
          </div>
        </section>

        <section className="manifesto section-shell reveal" aria-labelledby="manifesto-title">
          <div className="manifesto__label">
            <span className="section-number">01</span>
            <p className="eyebrow">Our point of view</p>
          </div>
          <div className="manifesto__copy">
            <h2 id="manifesto-title">
              More than an accessory—each piece is a little story you get to
              carry.
            </h2>
            <p>
              We mix vibrant color, thoughtful detail, and the warmth of
              handmade work to create pieces that feel joyful and personal.
            </p>
            <a className="text-link" href="/story/">
              Discover our story
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section className="collection" id="collection" aria-labelledby="collection-title">
          <div className="section-shell">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow">Small-batch favorites</p>
                <h2 id="collection-title">Made to be noticed.</h2>
              </div>
              <p>
                See something you love? Ask us about availability and purchase
                details through {contactChannel}.
              </p>
            </div>

            <div className="collection-filters reveal" aria-label="Filter collection">
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

            <div className="product-grid" aria-live="polite">
              {visibleProducts.map((product, index) => (
                <article
                  className="product-card reveal"
                  key={product.id}
                  style={{ '--card-delay': `${(index % 3) * 80}ms` } as React.CSSProperties}
                >
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
                    <div className="product-card__actions">
                      <a
                        className="product-card__personalize"
                        href={`/personalize/?references=${encodeURIComponent(product.id)}`}
                        aria-label={`Use as inspiration: ${product.name}`}
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
                        <ArrowDownRight aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="color-marquee" aria-hidden="true">
          <div>
            <span>Feito à mão</span><i>✦</i>
            <span>Colorido por natureza</span><i>✦</i>
            <span>Made with love</span><i>✦</i>
            <span>Feito à mão</span><i>✦</i>
            <span>Colorido por natureza</span><i>✦</i>
            <span>Made with love</span><i>✦</i>
          </div>
        </div>

        <section className="story" id="story" aria-labelledby="story-title">
          <div className="story__visual reveal">
            <PhotoFrame photo={photos.story} />
            <blockquote>
              “Our roots cross borders. Our creativity brings them home.”
            </blockquote>
          </div>
          <div className="story__content reveal">
            <p className="eyebrow">Born in Brazil · growing in Indiana</p>
            <h2 id="story-title">Two generations, one colorful vision.</h2>
            <p className="story__lead">
              Terra Brasilis is a family-run studio founded by Helena and
              Yluska—a Brazilian mother and daughter now living in Terre
              Haute.
            </p>
            <p>
              Their shared love of art and their Brazilian roots come together
              in jewelry filled with color, memory, and story. Every piece is
              created by hand, one detail at a time, and shared from their
              family to yours.
            </p>
            <div className="story__signature">
              <span>Com carinho,</span>
              <strong>Helena &amp; Yluska</strong>
            </div>
            <a
              className="button button--outline"
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              Follow our journey
              <InstagramIcon />
            </a>
          </div>
        </section>

        <section className="makers" id="makers" aria-labelledby="makers-title">
          <div className="section-shell makers__inner">
            <div className="makers__copy reveal">
              <p className="eyebrow">Crafted piece by piece</p>
              <h2 id="makers-title">Made by hand. Meant to feel personal.</h2>
              <p>
                From choosing a palette to placing the final detail, the making
                is part of the meaning. Small quantities leave room for
                curiosity, care, and pieces with their own character.
              </p>

              <ol className="process-list">
                <li>
                  <span>01</span>
                  <div>
                    <h3>Imagine</h3>
                    <p>Color, memories, and Brazilian inspiration set the mood.</p>
                  </div>
                </li>
                <li>
                  <span>02</span>
                  <div>
                    <h3>Make</h3>
                    <p>Every combination is assembled by hand in Terre Haute.</p>
                  </div>
                </li>
                <li>
                  <span>03</span>
                  <div>
                    <h3>Share</h3>
                    <p>You choose the piece that feels most like you.</p>
                  </div>
                </li>
              </ol>

              <a
                className="button button--coral makers__personalize"
                href="/personalize/"
              >
                Personalize a piece
                <Sparkles aria-hidden="true" />
              </a>
            </div>

            <div className="makers__photos reveal">
              <PhotoFrame photo={photos.makers} className="makers__photo-main" />
              <PhotoFrame photo={photos.detail} className="makers__photo-detail" />
              <span className="makers__note">Made slowly<br />worn joyfully</span>
            </div>
          </div>
        </section>

        <PersonalizeSection
          selectedReferences={personalizationReferences}
          onSelectedReferencesChange={setPersonalizationReferences}
          selectionNotice={personalizationNotice}
          onSelectionNoticeChange={setPersonalizationNotice}
        />

        <section className="instagram-section" aria-labelledby="instagram-title">
          <div className="section-shell">
            <div className="instagram-section__heading reveal">
              <div>
                <p className="eyebrow">Color in the wild</p>
                <h2 id="instagram-title">Follow along on Instagram.</h2>
              </div>
              <a
                className="text-link"
                href={siteConfig.instagramUrl}
                target="_blank"
                rel="noreferrer"
              >
                <InstagramIcon />
                {siteConfig.instagramHandle}
              </a>
            </div>
            <div className="instagram-grid reveal">
              {photos.instagram.map((photo) => (
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  key={photo.placeholderLabel}
                  aria-label={`${photo.placeholderLabel}. View ${siteConfig.instagramHandle} on Instagram`}
                >
                  <PhotoFrame photo={photo} />
                  <InstagramIcon />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact__sun" aria-hidden="true" />
          <div className="section-shell contact__inner reveal">
            <div className="contact__copy">
              <p className="eyebrow">See it. Love it. Message us.</p>
              <h2 id="contact-title">Your next favorite piece starts with hello.</h2>
              <p>
                We currently take orders through WhatsApp. Tell us what
                caught your eye and we&apos;ll help with availability, price, and
                purchase details.
              </p>
              <div className="contact__actions">
                <a
                  className="button button--coral"
                  href={contactHref()}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle aria-hidden="true" />
                  Message us on {contactChannel}
                </a>
                <a
                  className="button button--outline contact__personalize"
                  href="/personalize/"
                >
                  Request a personalized piece
                  <Sparkles aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="order-card">
              <p className="eyebrow">How it works</p>
              <ol>
                <li>
                  <span>1</span>
                  <div>
                    <h3>Find your favorite</h3>
                    <p>Browse the collection or spot something on Instagram.</p>
                  </div>
                </li>
                <li>
                  <span>2</span>
                  <div>
                    <h3>Send a message</h3>
                    <p>Share the piece name or a screenshot with us.</p>
                  </div>
                </li>
                <li>
                  <span>3</span>
                  <div>
                    <h3>We&apos;ll take it from there</h3>
                    <p>We&apos;ll confirm what&apos;s available and the next steps.</p>
                  </div>
                </li>
              </ol>
              <p className="order-card__local">
                <MapPin aria-hidden="true" />
                Proudly based in {siteConfig.location}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="site-footer__top section-shell">
          <div>
            <Brand inverse />
            <p>Brazilian roots. Indiana hands. Jewelry made with heart.</p>
          </div>
          <div className="site-footer__links">
            <div>
              <p className="eyebrow">Explore</p>
              {navItems.map((item) => (
                <a key={item.href} href={item.href}>{item.label}</a>
              ))}
            </div>
            <div>
              <p className="eyebrow">Connect</p>
              <a href={contactHref()} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
              <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <span>{siteConfig.location}</span>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom section-shell">
          <p>© {new Date().getFullYear()} Terra Brasilis. All rights reserved.</p>
          <p>Feito com amor · Made with love</p>
        </div>
      </footer>

      <a
        className="floating-contact"
        href={contactHref()}
        target="_blank"
        rel="noreferrer"
        aria-label={`Let's talk — message Terra Brasilis on ${contactChannel}`}
      >
        <MessageCircle aria-hidden="true" />
        <span>Let&apos;s talk</span>
      </a>

      <InquiryDialog
        piece={inquiryPiece}
        onClose={() => setInquiryPiece(null)}
      />
    </>
  )
}

export default App
