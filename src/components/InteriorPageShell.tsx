import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowDownRight, ArrowRight, Menu, X } from 'lucide-react'
import { contactHref, siteConfig } from '../data/siteContent'
import { AnnouncementBar } from './AnnouncementBar'
import { Brand } from './Brand'
import { InstagramIcon } from './InstagramIcon'

export type InteriorPageId =
  | 'collection'
  | 'story'
  | 'makers'
  | 'personalize'
  | 'contact'

type InteriorPageShellProps = {
  activePage: InteriorPageId
  children: ReactNode
  mainClassName?: string
}

const interiorNavItems: ReadonlyArray<{
  id: InteriorPageId
  label: string
  href: string
}> = [
  { id: 'collection', label: 'Collection', href: '/collection/' },
  { id: 'story', label: 'Our story', href: '/story/' },
  { id: 'makers', label: 'The makers', href: '/makers/' },
  { id: 'personalize', label: 'Personalize', href: '/personalize/' },
]

export function InteriorPageShell({
  activePage,
  children,
  mainClassName = '',
}: InteriorPageShellProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.classList.toggle('menu-is-open', menuOpen)

    return () => document.body.classList.remove('menu-is-open')
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      setMenuOpen(false)
      menuButtonRef.current?.focus()
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className={`interior-page-shell interior-page-shell--${activePage}`}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <AnnouncementBar />

      <header className="site-header">
        <div className="site-header__inner">
          <nav className="desktop-nav" aria-label="Primary navigation">
            {interiorNavItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={item.id === activePage ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            className="site-header__brand"
            href="/"
            aria-label="Terra Brasilis home"
          >
            <Brand compact inverse />
          </a>

          <div className="site-header__actions">
            <a
              className="header-contact"
              href="/contact/"
              aria-current={activePage === 'contact' ? 'page' : undefined}
            >
              Let&apos;s talk
              <ArrowDownRight size={17} aria-hidden="true" />
            </a>
            <button
              ref={menuButtonRef}
              className="icon-button menu-button"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="interior-mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav
            className="mobile-nav"
            id="interior-mobile-navigation"
            aria-label="Mobile navigation"
          >
            <p className="eyebrow">Explore</p>
            {interiorNavItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                aria-current={item.id === activePage ? 'page' : undefined}
                onClick={closeMenu}
              >
                <span>0{index + 1}</span>
                {item.label}
                <ArrowRight aria-hidden="true" />
              </a>
            ))}
            <a
              href="/contact/"
              aria-current={activePage === 'contact' ? 'page' : undefined}
              onClick={closeMenu}
            >
              <span>05</span>
              Contact
              <ArrowRight aria-hidden="true" />
            </a>
            <a
              className="mobile-nav__instagram"
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              <InstagramIcon />
              {siteConfig.instagramHandle}
            </a>
          </nav>
        )}
      </header>

      <main
        className={`interior-page-main${mainClassName ? ` ${mainClassName}` : ''}`}
        id="main-content"
      >
        {children}
      </main>

      <footer className="site-footer">
        <div className="site-footer__top section-shell">
          <div>
            <a
              className="site-header__brand"
              href="/"
            >
              <Brand inverse />
            </a>
            <p>Brazilian roots. Indiana hands. Jewelry made with heart.</p>
          </div>
          <div className="site-footer__links">
            <div>
              <p className="eyebrow">Explore</p>
              {interiorNavItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  aria-current={item.id === activePage ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/contact/"
                aria-current={activePage === 'contact' ? 'page' : undefined}
              >
                Contact
              </a>
            </div>
            <div>
              <p className="eyebrow">Connect</p>
              <a
                href={siteConfig.instagramMessageUrl}
                target="_blank"
                rel="noreferrer"
              >
                Instagram message
              </a>
              <a href={contactHref()} target="_blank" rel="noreferrer">
                WhatsApp
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
    </div>
  )
}
