import { ArrowRight, Heart, MapPin } from 'lucide-react'
import { InstagramIcon } from '../components/InstagramIcon'
import { InteriorPageShell } from '../components/InteriorPageShell'
import { PhotoFrame } from '../components/PhotoFrame'
import { photos, siteConfig } from '../data/siteContent'
import { sitePath } from '../sitePath'

export function StoryPage() {
  return (
    <InteriorPageShell activePage="story">
      <header className="page-hero page-hero--story">
          <div className="section-shell page-hero__inner page-story-hero__inner">
            <div className="page-hero__copy">
              <p className="eyebrow">Our story</p>
              <h1>Two generations, one colorful vision.</h1>
              <p>
                Terra Brasilis is a family-run jewelry studio shaped by
                Brazilian roots, creative connection, and the warmth of making
                something by hand.
              </p>
              <p className="page-hero__location">
                <MapPin aria-hidden="true" />
                Brazil at heart · {siteConfig.location} at home
              </p>
            </div>
            <PhotoFrame
              photo={photos.story}
              className="page-story-hero__photo"
              eager
            />
          </div>
      </header>

      <section
          className="page-story-intro section-shell"
          aria-labelledby="family-story-title"
        >
          <div className="page-story-intro__marker" aria-hidden="true">
            <Heart />
            <span>From our family to yours</span>
          </div>
          <div className="page-story-intro__copy">
            <p className="eyebrow">Born in Brazil · growing in Indiana</p>
            <h2 id="family-story-title">A story carried across borders.</h2>
            <p className="page-story-intro__lead">
              Helena and Yluska are the Brazilian mother and daughter behind
              Terra Brasilis, now creating together in Terre Haute, Indiana.
            </p>
            <p>
              Their shared love of art and their Brazilian roots meet in
              jewelry filled with expressive color, memory, and joy. The work
              brings part of home into the present while leaving room for each
              person to make a piece part of their own story.
            </p>
          </div>
      </section>

      <section className="page-story-values" aria-labelledby="story-values-title">
          <div className="section-shell page-story-values__inner">
            <div className="page-story-values__heading">
              <p className="eyebrow">What guides us</p>
              <h2 id="story-values-title">Color, connection, and care.</h2>
            </div>
            <div className="page-story-values__grid">
              <article>
                <span>01</span>
                <h3>Brazilian spirit</h3>
                <p>
                  Culture and color are an ongoing source of inspiration for
                  every joyful combination.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Family creativity</h3>
                <p>
                  Two generations bring their own perspective to a shared
                  handmade practice.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Personal meaning</h3>
                <p>
                  Jewelry becomes more than an accessory when it carries a
                  memory, mood, or detail chosen by you.
                </p>
              </article>
            </div>
          </div>
      </section>

      <section
          className="page-story-quote section-shell"
          aria-label="A note from the founders"
        >
          <PhotoFrame photo={photos.detail} className="page-story-quote__photo" />
          <div className="page-story-quote__copy">
            <blockquote>
              “Our roots cross borders. Our creativity brings them home.”
            </blockquote>
            <p className="page-story-quote__signature">
              <span>Com carinho,</span>
              <strong>Helena &amp; Yluska</strong>
            </p>
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

      <section className="page-callout page-callout--story">
          <div className="section-shell page-callout__inner">
            <div>
              <p className="eyebrow">See the story take shape</p>
              <h2>Discover what we make together.</h2>
            </div>
            <div className="page-callout__actions">
              <a
                className="button button--coral"
                href={sitePath('/collection/')}
              >
                Explore the collection
                <ArrowRight aria-hidden="true" />
              </a>
              <a className="text-link" href={sitePath('/makers/')}>
                Meet the makers
                <ArrowRight aria-hidden="true" />
              </a>
            </div>
          </div>
      </section>
    </InteriorPageShell>
  )
}

export default StoryPage
