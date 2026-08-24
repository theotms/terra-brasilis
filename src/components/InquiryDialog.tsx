import { useEffect, useRef, useState } from 'react'
import { Check, Copy, MessageCircle, X } from 'lucide-react'
import {
  contactChannel,
  contactHref,
  inquiryMessage,
} from '../data/siteContent'

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
        Each piece is made in small quantities. Send us this quick note and
        we&apos;ll confirm availability, price, and the purchase details.
      </p>
      <div className="message-preview">
        <p>{message}</p>
        <button type="button" onClick={copyMessage}>
          {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy note'}
        </button>
      </div>
      <a
        className="button button--primary button--full"
        href={contactHref(piece ?? undefined)}
        target="_blank"
        rel="noreferrer"
      >
        <MessageCircle aria-hidden="true" />
        Continue on {contactChannel}
      </a>
    </dialog>
  )
}
