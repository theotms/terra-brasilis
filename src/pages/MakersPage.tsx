import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import { InteriorPageShell } from '../components/InteriorPageShell'
import { PhotoFrame } from '../components/PhotoFrame'
import { photos, siteConfig } from '../data/siteContent'

const processSteps = [
  {
    number: '01',
    title: 'Imagine',
    copy: 'Color, memories, and Brazilian inspiration set the mood for a new piece.',
  },
  {
    number: '02',
    title: 'Choose',
    copy: 'The palette and details come together with curiosity and intention.',
  },
  {
    number: '03',
    title: 'Make',
    copy: `Each combination is assembled by hand in ${siteConfig.location}.`,
  },
  {
    number: '04',
    title: 'Share',
    copy: 'The finished piece leaves our hands ready to become part of your story.',
  },
]

export function MakersPage() {
  return (
    <InteriorPageShell activePage="makers">
      <header className="page-hero page-hero--makers">
          <div className="section-shell page-hero__inner page-makers-hero__inner">
            <div className="page-hero__copy">
              <p className="eyebrow">The makers</p>
              <h1>Made by hand. Meant to feel personal.</h1>
              <p>
                Behind every Terra Brasilis piece are a mother, a daughter,
                and a shared love for color, detail, and making together.
              </p>
              <a className="button button--coral" href="/personalize/">
                Make it yours
                <Sparkles aria-hidden="true" />
              </a>
            </div>
            <div className="page-makers-hero__photos">
              <PhotoFrame
                photo={photos.makers}
                className="page-makers-hero__photo-main"
                eager
              />
              <PhotoFrame
                photo={photos.detail}
                className="page-makers-hero__photo-detail"
              />
              <span className="page-makers-hero__note">
                Made slowly
                <br />
                worn joyfully
              </span>
            </div>
          </div>
      </header>

      <section
          className="page-makers-intro section-shell"
          aria-labelledby="makers-intro-title"
        >
          <div className="page-makers-intro__heading">
            <p className="eyebrow">Helena &amp; Yluska</p>
            <h2 id="makers-intro-title">Two makers, one creative language.</h2>
          </div>
          <div className="page-makers-intro__copy">
            <p>
              Terra Brasilis is owned and created by a Brazilian mother and
              daughter living in Terre Haute. Their work brings two generations
              to the same table, connected through creativity and their roots.
            </p>
            <p>
              Working in small quantities leaves room for thoughtful choices,
              playful combinations, and the distinct character that comes from
              handwork. No two stories are exactly alike—and the pieces do not
              need to be, either.
            </p>
          </div>
      </section>

      <section
        className="page-maker-profiles"
        aria-labelledby="maker-profiles-title"
      >
        <div className="section-shell">
          <div className="page-maker-profiles__heading">
            <div>
              <p className="eyebrow">Meet the family</p>
              <h2 id="maker-profiles-title">Helena &amp; Yluska</h2>
            </div>
            <p>
              A Brazilian daughter and mother building Terra Brasilis together
              in Terre Haute, Indiana.
            </p>
          </div>

          <div className="page-maker-profiles__grid">
            <article className="maker-profile">
              <PhotoFrame
                photo={photos.helena}
                className="maker-profile__photo"
              />
              <div className="maker-profile__copy">
                <p className="eyebrow">Daughter · co-owner</p>
                <h3>Helena</h3>
                <p>
                  Helena is Yluska&apos;s daughter and one half of the family team
                  bringing Terra Brasilis to life.
                </p>
              </div>
            </article>

            <article className="maker-profile">
              <PhotoFrame
                photo={photos.yluska}
                className="maker-profile__photo"
              />
              <div className="maker-profile__copy">
                <p className="eyebrow">Mother · co-owner</p>
                <h3>Yluska</h3>
                <p>
                  Yluska is Helena&apos;s mother and the other half of the
                  mother-and-daughter studio behind every Terra Brasilis piece.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="page-process" aria-labelledby="making-process-title">
          <div className="section-shell">
            <div className="page-section-heading page-process__heading">
              <div>
                <p className="eyebrow">Crafted piece by piece</p>
                <h2 id="making-process-title">From an idea to something you can wear.</h2>
              </div>
              <p>
                The making is part of the meaning: every detail is considered
                and every combination is assembled by hand.
              </p>
            </div>

            <ol className="page-process__list">
              {processSteps.map((step) => (
                <li key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
      </section>

      <section
          className="page-makers-detail section-shell"
          aria-labelledby="handmade-matters-title"
        >
          <PhotoFrame photo={photos.hero} className="page-makers-detail__photo" />
          <div className="page-makers-detail__copy">
            <Heart aria-hidden="true" />
            <p className="eyebrow">Why handmade matters</p>
            <h2 id="handmade-matters-title">Care you can see. Character you can feel.</h2>
            <p>
              Handmade work gives each piece its own presence. It also keeps
              the connection between the idea, the makers, and the person who
              will wear it close from beginning to end.
            </p>
            <a className="text-link" href="/collection/">
              See the collection
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
      </section>

      <section className="page-callout page-callout--makers">
          <div className="section-shell page-callout__inner">
            <div>
              <p className="eyebrow">Your idea, made by us</p>
              <h2>Have a name, color palette, or theme in mind?</h2>
              <p>
                Start a personalized request and choose up to three Terra
                Brasilis models to show us what you love.
              </p>
            </div>
            <a className="button button--coral" href="/personalize/">
              Start personalizing
              <Sparkles aria-hidden="true" />
            </a>
          </div>
      </section>
    </InteriorPageShell>
  )
}

export default MakersPage
