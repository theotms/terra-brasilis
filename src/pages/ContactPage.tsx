import {
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { InstagramIcon } from '../components/InstagramIcon'
import { InteriorPageShell } from '../components/InteriorPageShell'
import { contactHref, siteConfig } from '../data/siteContent'
import { sitePath } from '../sitePath'

function formatWhatsAppNumber(value: string) {
  const digits = value.replace(/\D/g, '')

  if (!digits) return 'Number to be added'

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }

  return `+${digits}`
}

export function ContactPage() {
  const hasWhatsAppNumber = Boolean(
    siteConfig.whatsappNumber.replace(/\D/g, ''),
  )

  return (
    <InteriorPageShell activePage="contact" mainClassName="page-contact">
      <header className="page-hero page-contact-hero">
        <div className="section-shell page-hero__inner page-contact-hero__inner">
          <div className="page-hero__copy page-contact-hero__copy">
            <p className="eyebrow">Contact us</p>
            <h1>Let&apos;s make something joyful together.</h1>
            <p>
              Send us an Instagram message first, or choose WhatsApp if you
              prefer. We can help with availability, orders, and personalized
              requests through either option.
            </p>
          </div>
          <div className="page-contact-hero__location">
            <MapPin aria-hidden="true" />
            <p>
              <span>Handmade in</span>
              <strong>{siteConfig.location}</strong>
            </p>
          </div>
        </div>
      </header>

      <section
        className="section-shell page-contact-methods"
        aria-labelledby="contact-methods-title"
      >
        <div className="page-contact-methods__heading">
          <p className="eyebrow">Get in touch</p>
          <h2 id="contact-methods-title">We would love to hear from you.</h2>
        </div>

        <div className="page-contact-methods__grid">
          <article className="contact-method contact-method--instagram">
            <div className="contact-method__icon">
              <InstagramIcon />
            </div>
            <p className="contact-method__label">Instagram</p>
            <h3>{siteConfig.instagramHandle}</h3>
            <p className="contact-method__copy">
              Our first contact option. Follow our latest work or send a direct
              message about a piece, an order, or a personalized idea.
            </p>
            <a
              className="button button--outline contact-method__button"
              href={siteConfig.instagramMessageUrl}
              target="_blank"
              rel="noreferrer"
            >
              Message us on Instagram
              <ArrowUpRight aria-hidden="true" />
            </a>
          </article>

          <article className="contact-method contact-method--whatsapp">
            <div className="contact-method__icon">
              <MessageCircle aria-hidden="true" />
            </div>
            <p className="contact-method__label">WhatsApp</p>
            <h3>{formatWhatsAppNumber(siteConfig.whatsappNumber)}</h3>
            <p className="contact-method__copy">
              Prefer WhatsApp? Use it as the second option for availability,
              ordering, or a custom jewelry idea.
            </p>
            <a
              className="button button--coral contact-method__button"
              href={contactHref()}
              target="_blank"
              rel="noreferrer"
            >
              {hasWhatsAppNumber
                ? 'Message us on WhatsApp'
                : 'Prepare a WhatsApp message'}
              <ArrowUpRight aria-hidden="true" />
            </a>
          </article>
        </div>
      </section>

      <section className="page-contact-details">
        <div className="section-shell page-contact-details__inner">
          <article className="page-contact-detail">
            <MapPin aria-hidden="true" />
            <div>
              <h2>Our home</h2>
              <p>{siteConfig.location}</p>
            </div>
          </article>
          <article className="page-contact-detail">
            <Clock3 aria-hidden="true" />
            <div>
              <h2>When you will hear from us</h2>
              <p>
                We are a small, family-run studio and reply personally as soon
                as we can.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="page-callout page-callout--contact">
        <div className="section-shell page-callout__inner">
          <div>
            <p className="eyebrow">Have something special in mind?</p>
            <h2>Begin with your colors, theme, and favorite inspirations.</h2>
            <p>
              Tell us what you imagine, then send the completed request to us
              by Instagram message or WhatsApp.
            </p>
          </div>
          <div className="page-callout__actions">
            <a
              className="button button--coral"
              href={sitePath('/personalize/')}
            >
              Personalize your piece
              <Sparkles aria-hidden="true" />
            </a>
            <a className="text-link" href={sitePath('/collection/')}>
              Explore the collection
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
    </InteriorPageShell>
  )
}

export default ContactPage
