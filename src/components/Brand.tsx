type BrandProps = {
  inverse?: boolean
  compact?: boolean
}

export function BrandMark({ inverse = false }: Pick<BrandProps, 'inverse'>) {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 72 72"
      aria-hidden="true"
      focusable="false"
    >
      <circle
        cx="36"
        cy="36"
        r="34.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <circle
        cx="36"
        cy="36"
        r="29"
        fill={inverse ? '#f8f2e7' : '#123f31'}
      />
      <path
        d="M36 51V24m0 10c-6.7-.8-10.5-4.5-11.3-10.7C31 24 35 27.8 36 34Zm0 8.2c6.7-.8 10.5-4.5 11.3-10.7C41 32.2 37 36 36 42.2Z"
        fill="none"
        stroke={inverse ? '#123f31' : '#e7b650'}
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="19.5" r="2.8" fill="#ef6a43" />
    </svg>
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
      <BrandMark inverse={inverse} />
      <span className="brand__words">
        <span className="brand__name">Terra Brasilis</span>
        {!compact && (
          <span className="brand__tagline">Handcrafted jewelry</span>
        )}
      </span>
    </span>
  )
}
