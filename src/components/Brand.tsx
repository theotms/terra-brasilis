import { sitePath } from '../sitePath'

type BrandProps = {
  inverse?: boolean
  compact?: boolean
}

export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <img
        className="brand-mark__image"
        src={sitePath('/images/brand/official-logo.jpg')}
        alt=""
        width="945"
        height="946"
      />
    </span>
  )
}

export function Brand({ inverse = false, compact = false }: BrandProps) {
  return (
    <span
      className={`brand${inverse ? ' brand--inverse' : ''}${compact ? ' brand--compact' : ''}`}
      aria-label={
        compact ? 'Terra Brasilis' : 'Terra Brasilis handcrafted jewelry'
      }
    >
      <BrandMark />
      <span className="brand__words">
        <span className="brand__name">Terra Brasilis</span>
        {!compact && (
          <span className="brand__tagline">Handcrafted jewelry</span>
        )}
      </span>
    </span>
  )
}
