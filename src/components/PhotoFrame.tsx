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
  const alternateSrcs = photo.alternateSrcs ?? []

  return (
    <div
      className={`photo-frame photo-frame--${photo.tone} ${className}`.trim()}
      data-alternate-count={alternateSrcs.length || undefined}
    >
      {photo.src ? (
        <>
          <img
            className="photo-frame__image photo-frame__image--primary"
            src={photo.src}
            alt={photo.alt}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : 'auto'}
          />
          {alternateSrcs.map((src, index) => (
            <img
              className={`photo-frame__image photo-frame__image--alternate photo-frame__image--alternate-${index + 1}`}
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              key={src}
            />
          ))}
        </>
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
