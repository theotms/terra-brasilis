type BrandProps = {
  inverse?: boolean
  compact?: boolean
}

export function BrandMark() {
  return (
    <img
      className="brand-mark"
      src="/images/brand/official-logo.jpg"
      alt=""
      width="947"
      height="946"
    />
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
