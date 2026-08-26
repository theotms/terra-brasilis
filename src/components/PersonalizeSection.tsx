import { useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  Check,
  Copy,
  Heart,
  MessageCircle,
  Sparkles,
  X,
} from 'lucide-react'
import {
  messageContactHref,
  products,
  siteConfig,
} from '../data/siteContent'
import { InstagramIcon } from './InstagramIcon'
import { PhotoFrame } from './PhotoFrame'

type PersonalizeSectionProps = {
  selectedReferences: string[]
  onSelectedReferencesChange: (references: string[]) => void
  selectionNotice: string
  onSelectionNoticeChange: (notice: string) => void
  headingLevel?: 'h1' | 'h2'
}

type RequestDetails = {
  pieceTypes: string[]
  themes: string[]
  nameOrWord: string
  colors: string
  occasionDate: string
  notes: string
  customerName: string
  whatsappNumber: string
}

const pieceTypes = [
  {
    value: 'Anklet',
    label: 'Anklet',
    detail: 'A colorful detail made for every step.',
  },
  {
    value: 'Bracelet',
    label: 'Bracelet',
    detail: 'One statement piece or a playful stack.',
  },
  {
    value: 'Necklace',
    label: 'Necklace',
    detail: 'A centerpiece designed around your story.',
  },
  {
    value: 'Keychain or bag charm',
    label: 'Charm',
    detail: 'A personalized keychain or bag charm.',
  },
  {
    value: 'Not sure yet',
    label: 'Help me choose',
    detail: 'Share the idea and our makers can guide you.',
  },
]

const themeOptions = [
  'Name or word',
  'Wedding',
  'Halloween',
  'Birthday or celebration',
  'Brazilian-inspired',
  'American colors',
  'Summer vibes',
  'Something else',
]

const initialDetails: RequestDetails = {
  pieceTypes: [],
  themes: [],
  nameOrWord: '',
  colors: '',
  occasionDate: '',
  notes: '',
  customerName: '',
  whatsappNumber: '',
}

function formatDate(value: string) {
  if (!value) return ''

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${value}T12:00:00`))
}

export function PersonalizeSection({
  selectedReferences,
  onSelectedReferencesChange,
  selectionNotice,
  onSelectionNoticeChange,
  headingLevel = 'h2',
}: PersonalizeSectionProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [details, setDetails] = useState<RequestDetails>(initialDetails)
  const [copyStatus, setCopyStatus] = useState<
    'idle' | 'copied' | 'error'
  >('idle')

  const selectedProducts = useMemo(
    () =>
      products.filter((product) => selectedReferences.includes(product.id)),
    [selectedReferences],
  )

  const requestMessage = useMemo(() => {
    const inspiration = selectedProducts.length
      ? selectedProducts.map((product) => product.name).join(', ')
      : 'No specific model yet — I would like your guidance'
    const themes = details.themes.length
      ? details.themes.join(', ')
      : 'Open to your ideas'

    return [
      'Hi Terra Brasilis! I would love to request personalized jewelry.',
      '',
      `My name: ${details.customerName}`,
      `${details.pieceTypes.length > 1 ? 'Pieces' : 'Piece'}: ${details.pieceTypes.join(', ')}`,
      `Inspiration models: ${inspiration}`,
      `Theme or occasion: ${themes}`,
      details.nameOrWord
        ? `Name or word to include: ${details.nameOrWord}`
        : 'Name or word to include: None yet',
      details.colors
        ? `Colors: ${details.colors}`
        : 'Colors: I would like your suggestions',
      details.occasionDate
        ? `Needed around: ${formatDate(details.occasionDate)}`
        : 'Needed around: No specific date',
      details.whatsappNumber
        ? `My WhatsApp number: ${details.whatsappNumber}`
        : '',
      '',
      `My idea: ${details.notes}`,
      '',
      'I understand this is a request, not a confirmed order. Please let me know what is possible, along with pricing and timing. Thank you!',
    ]
      .filter((line, index, lines) => line || lines[index - 1] !== '')
      .join('\n')
  }, [details, selectedProducts])

  const maximumSelected = selectedReferences.length >= 3
  const Heading = headingLevel
  const StepHeading = headingLevel === 'h1' ? 'h2' : 'h3'

  function toggleReference(productId: string) {
    if (selectedReferences.includes(productId)) {
      onSelectedReferencesChange(
        selectedReferences.filter((reference) => reference !== productId),
      )
      onSelectionNoticeChange(
        'Inspiration removed. You can choose another model.',
      )
      return
    }

    if (maximumSelected) {
      onSelectionNoticeChange(
        'You already chose three models. Remove one before choosing another.',
      )
      return
    }

    const nextReferences = [...selectedReferences, productId]
    onSelectedReferencesChange(nextReferences)
    onSelectionNoticeChange(
      nextReferences.length === 3
        ? 'Three of three models selected. Remove one to make a change.'
        : `${nextReferences.length} of 3 models selected.`,
    )
  }

  function toggleTheme(theme: string) {
    setDetails((current) => ({
      ...current,
      themes: current.themes.includes(theme)
        ? current.themes.filter((item) => item !== theme)
        : [...current.themes, theme],
    }))
  }

  function togglePieceType(pieceType: string) {
    setDetails((current) => {
      if (pieceType === 'Not sure yet') {
        return {
          ...current,
          pieceTypes: current.pieceTypes.includes(pieceType)
            ? []
            : [pieceType],
        }
      }

      const currentChoices = current.pieceTypes.filter(
        (item) => item !== 'Not sure yet',
      )

      return {
        ...current,
        pieceTypes: currentChoices.includes(pieceType)
          ? currentChoices.filter((item) => item !== pieceType)
          : [...currentChoices, pieceType],
      }
    })
  }

  function openReview(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCopyStatus('idle')
    dialogRef.current?.showModal()
  }

  function closeReview() {
    dialogRef.current?.close()
  }

  async function copyRequest() {
    try {
      await navigator.clipboard.writeText(requestMessage)
      setCopyStatus('copied')
    } catch {
      setCopyStatus('error')
    }
  }

  return (
    <section
      className="personalize-section"
      id="personalize"
      aria-labelledby="personalize-title"
    >
      <span className="personalize-section__orbit" aria-hidden="true" />
      <div className="section-shell personalize-section__inner">
        <header className="personalize-intro reveal">
          <div className="personalize-intro__copy">
            <p className="eyebrow">Made for your story</p>
            <Heading id="personalize-title">
              Your idea, made <em>by hand.</em>
            </Heading>
            <p>
              Imagine a name anklet, a wedding palette, a Halloween piece, or
              something completely your own. Choose what inspires you and tell
              Helena and Yluska what you have in mind.
            </p>
          </div>

          <div className="personalize-intro__guide">
            <p className="eyebrow">How it works</p>
            <ol>
              <li><span>01</span>Choose one or more jewelry types</li>
              <li><span>02</span>Pick up to three inspirations</li>
              <li><span>03</span>Share the details that matter</li>
            </ol>
            <p>
              This begins a conversation. We&apos;ll confirm the design,
              materials, price, and timing before anything is ordered.
            </p>
          </div>
        </header>

        <form className="personalize-form reveal" onSubmit={openReview}>
          <fieldset className="request-step">
            <legend className="visually-hidden">
              Choose one or more jewelry types
            </legend>
            <div className="request-step__heading">
              <span>01</span>
              <div>
                <p className="eyebrow">Start with the piece</p>
                <StepHeading>What would you like us to make?</StepHeading>
              </div>
              <p>Choose one or more</p>
            </div>

            <div className="piece-choice-grid">
              {pieceTypes.map((piece) => (
                <label
                  className={`piece-choice${
                    details.pieceTypes.includes(piece.value)
                      ? ' is-selected'
                      : ''
                  }`}
                  key={piece.value}
                >
                  <input
                    type="checkbox"
                    name="piece-types"
                    value={piece.value}
                    checked={details.pieceTypes.includes(piece.value)}
                    onChange={() => togglePieceType(piece.value)}
                    required={details.pieceTypes.length === 0}
                  />
                  <span className="piece-choice__icon" aria-hidden="true">
                    <Heart />
                  </span>
                  <span className="piece-choice__copy">
                    <strong>{piece.label}</strong>
                    <small>{piece.detail}</small>
                  </span>
                  <span className="piece-choice__check" aria-hidden="true">
                    <Check />
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="request-step">
            <legend className="visually-hidden">
              Choose up to three inspiration models
            </legend>
            <div className="request-step__heading">
              <span>02</span>
              <div>
                <p className="eyebrow">Find your direction</p>
                <StepHeading>Choose up to three models you like.</StepHeading>
              </div>
              <p
                className={maximumSelected ? 'is-complete' : ''}
                aria-live="polite"
                aria-atomic="true"
              >
                {selectedReferences.length} / 3 selected
              </p>
            </div>

            <div className="reference-grid">
              {products.map((product) => {
                const selected = selectedReferences.includes(product.id)
                const disabled = maximumSelected && !selected

                return (
                  <div
                    className={`reference-card${selected ? ' is-selected' : ''}${
                      disabled ? ' is-disabled' : ''
                    }`}
                    key={product.id}
                  >
                    <input
                      id={`reference-${product.id}`}
                      type="checkbox"
                      checked={selected}
                      disabled={disabled}
                      onChange={() => toggleReference(product.id)}
                    />
                    <label
                      className="reference-card__hit"
                      htmlFor={`reference-${product.id}`}
                    >
                      <span className="visually-hidden">
                        {selected ? 'Remove' : 'Choose'} {product.name} as an
                        inspiration model
                      </span>
                    </label>
                    <div className="reference-card__visual">
                      <PhotoFrame photo={product.photo} />
                      <span className="reference-card__number">
                        {selected ? <Check aria-hidden="true" /> : '+'}
                      </span>
                    </div>
                    <div className="reference-card__copy">
                      <small>{product.category}</small>
                      <strong>{product.name}</strong>
                      <span>{selected ? 'Selected' : 'Choose this model'}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="reference-grid__footer">
              <button
                type="button"
                className="text-link reference-clear"
                onClick={() => {
                  onSelectedReferencesChange([])
                  onSelectionNoticeChange('All inspiration models cleared.')
                }}
                disabled={selectedReferences.length === 0}
              >
                No reference yet / clear choices
              </button>
              <p className="selection-notice" aria-live="polite">
                {selectionNotice ||
                  'You can also attach your own inspiration photos when you message us.'}
              </p>
            </div>
          </fieldset>

          <fieldset className="request-step">
            <legend className="visually-hidden">
              Share your theme and request details
            </legend>
            <div className="request-step__heading">
              <span>03</span>
              <div>
                <p className="eyebrow">Make it meaningful</p>
                <StepHeading>What should your piece feel like?</StepHeading>
              </div>
              <p>Choose any that fit</p>
            </div>

            <div className="theme-choice-grid">
              {themeOptions.map((theme) => (
                <label
                  className={`theme-choice${
                    details.themes.includes(theme) ? ' is-selected' : ''
                  }`}
                  key={theme}
                >
                  <input
                    type="checkbox"
                    checked={details.themes.includes(theme)}
                    onChange={() => toggleTheme(theme)}
                  />
                  <span>{theme}</span>
                  <Check aria-hidden="true" />
                </label>
              ))}
            </div>

            <div className="request-fields">
              <label>
                <span>Name or word to include <small>Optional</small></span>
                <input
                  type="text"
                  value={details.nameOrWord}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      nameOrWord: event.target.value,
                    }))
                  }
                  placeholder="For example: Sofia, amor, bride"
                  maxLength={40}
                />
              </label>

              <label>
                <span>Colors you love <small>Optional</small></span>
                <input
                  type="text"
                  value={details.colors}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      colors: event.target.value,
                    }))
                  }
                  placeholder="For example: emerald, gold, coral"
                  maxLength={80}
                />
              </label>

              <label>
                <span>Event or desired date <small>Optional</small></span>
                <input
                  type="date"
                  value={details.occasionDate}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      occasionDate: event.target.value,
                    }))
                  }
                />
              </label>

              <label>
                <span>WhatsApp number <small>Optional</small></span>
                <input
                  type="tel"
                  value={details.whatsappNumber}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      whatsappNumber: event.target.value,
                    }))
                  }
                  placeholder="For example: +1 812 555 1234"
                  autoComplete="tel"
                  maxLength={24}
                />
              </label>

              <label className="request-fields__wide">
                <span>Your name</span>
                <input
                  type="text"
                  value={details.customerName}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      customerName: event.target.value,
                    }))
                  }
                  placeholder="How should we greet you?"
                  autoComplete="name"
                  maxLength={60}
                  required
                />
              </label>

              <label className="request-fields__wide">
                <span>Tell us what you imagine</span>
                <textarea
                  value={details.notes}
                  onChange={(event) =>
                    setDetails((current) => ({
                      ...current,
                      notes: event.target.value,
                    }))
                  }
                  placeholder="Describe the mood, materials, size, who it is for, or any little detail that matters to you."
                  rows={5}
                  minLength={10}
                  maxLength={800}
                  required
                />
                <small>{details.notes.length} / 800 characters</small>
              </label>
            </div>
          </fieldset>

          <div className="personalize-submit">
            <div>
              <Sparkles aria-hidden="true" />
              <p>
                Nothing is sent yet. First, you&apos;ll review a ready-to-copy
                message with all your choices.
              </p>
            </div>
            <button className="button button--coral" type="submit">
              Review my request
              <ArrowRight aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>

      <dialog
        className="personalize-review"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeReview()
        }}
      >
        <button
          className="icon-button personalize-review__close"
          type="button"
          onClick={closeReview}
          aria-label="Close request review"
        >
          <X aria-hidden="true" />
        </button>
        <p className="eyebrow">Your idea is ready</p>
        <h2>Review your request.</h2>
        <p className="personalize-review__intro">
          Copy this note, then message us on Instagram or continue with
          WhatsApp. You can edit it or attach your own inspiration photos
          before sending.
        </p>
        <div className="personalize-review__message">
          <p>{requestMessage}</p>
        </div>
        <div className="personalize-review__actions">
          <button
            className="button button--primary personalize-review__copy"
            type="button"
            onClick={copyRequest}
          >
            {copyStatus === 'copied' ? (
              <Check aria-hidden="true" />
            ) : (
              <Copy aria-hidden="true" />
            )}
            {copyStatus === 'copied' ? 'Request copied' : 'Copy request'}
          </button>
          <a
            className="button button--coral"
            href={siteConfig.instagramMessageUrl}
            target="_blank"
            rel="noreferrer"
          >
            <InstagramIcon />
            Message on Instagram
          </a>
          <a
            className="button button--light"
            href={messageContactHref(requestMessage)}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            Continue on WhatsApp
          </a>
        </div>
        <p className="personalize-review__status" aria-live="polite">
          {copyStatus === 'copied' &&
            'Copied — paste it into Instagram, or continue to WhatsApp.'}
          {copyStatus === 'error' &&
            'Copy was blocked by your browser. Select the message above and copy it manually.'}
          {copyStatus === 'idle' &&
            'Instagram cannot fill the note automatically, so copy it before opening your message.'}
        </p>
        <p className="personalize-review__fine-print">
          This request is not a confirmed order. Terra Brasilis will confirm
          feasibility, sizing, materials, price, and timing with you.
        </p>
      </dialog>
    </section>
  )
}
