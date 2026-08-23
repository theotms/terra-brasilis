import { ImageIcon } from 'lucide-react'
import type { PhotoAsset } from '../data/siteContent'

type PhotoFrameProps = {
  photo: PhotoAsset
  className?: string
  eager?: boolean
}

export function PhotoFrame({
  photo,
  className = '',
  eager = false,
}: PhotoFrameProps) {
  return (
    <div
      className={`photo-frame photo-frame--${photo.tone} ${className}`.trim()}
    >
      {photo.src ? (
        <img
          src={photo.src}
          alt={photo.alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
        />
      ) : (
        <div
          className="photo-placeholder"
          role="img"
          aria-label={`${photo.alt}. Image placeholder.`}
        >
          <span className="photo-placeholder__orb photo-placeholder__orb--one" />
          <span className="photo-placeholder__orb photo-placeholder__orb--two" />
          <span className="photo-placeholder__leaf photo-placeholder__leaf--one" />
          <span className="photo-placeholder__leaf photo-placeholder__leaf--two" />
          <span className="photo-placeholder__label">
            <ImageIcon size={15} strokeWidth={1.7} aria-hidden="true" />
            {photo.placeholderLabel}
          </span>
        </div>
      )}
    </div>
  )
}
