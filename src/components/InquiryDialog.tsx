import { useEffect, useRef, useState } from 'react'
import { Check, Copy, MessageCircle, X } from 'lucide-react'
import { contactHref, inquiryMessage, siteConfig } from '../data/siteContent'
import { InstagramIcon } from './InstagramIcon'

type InquiryDialogProps = {
  piece: string | null
  onClose: () => void
}

export function InquiryDialog({ piece, onClose }: InquiryDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [copied, setCopied] = useState(false)
  const message = inquiryMessage(piece ?? undefined)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (piece && !dialog.open) {
      dialog.showModal()
      setCopied(false)
    } else if (!piece && dialog.open) {
      dialog.close()
    }
  }, [piece])

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <dialog
      className="inquiry-dialog"
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      <button
        className="icon-button inquiry-dialog__close"
        type="button"
        onClick={onClose}
        aria-label="Close inquiry"
      >
        <X aria-hidden="true" />
      </button>
      <p className="eyebrow">Let&apos;s find your piece</p>
      <h2>Ask about {piece}</h2>
      <p className="inquiry-dialog__intro">
        Each piece is made in small quantities. Copy this quick note, then
        message us on Instagram or continue with WhatsApp.
      </p>
      <div className="message-preview">
        <p>{message}</p>
        <button type="button" onClick={copyMessage}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy note'}
        </button>
      </div>
      <div className="inquiry-dialog__actions">
        <a
          className="button button--coral button--full"
          href={siteConfig.instagramMessageUrl}
          target="_blank"
          rel="noreferrer"
        >
          <InstagramIcon />
          Message on Instagram
        </a>
        <a
          className="button button--outline button--full"
          href={contactHref(piece ?? undefined)}
          target="_blank"
          rel="noreferrer"
        >
          <MessageCircle aria-hidden="true" />
          Continue on WhatsApp
        </a>
      </div>
      <p className="inquiry-dialog__hint">
        Instagram opens first. Paste the copied note into your message, or use
        WhatsApp as the second option.
      </p>
    </dialog>
  )
}
