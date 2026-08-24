import { Sparkles } from 'lucide-react'
import { siteConfig } from '../data/siteContent'

function BrazilFlag() {
  return (
    <svg
      className="announcement__flag"
      viewBox="0 0 28 20"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="28" height="20" rx="1.5" fill="#009B3A" />
      <path d="M14 2.7 25 10 14 17.3 3 10Z" fill="#FFDF00" />
      <circle cx="14" cy="10" r="4.25" fill="#002776" />
      <path
        d="M10.3 9.1c2.7-1 5.8-.7 8.2.8"
        fill="none"
        stroke="#FFF"
        strokeWidth="0.65"
      />
    </svg>
  )
}

function UnitedStatesFlag() {
  return (
    <svg
      className="announcement__flag"
      viewBox="0 0 28 20"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="28" height="20" rx="1.5" fill="#FFF" />
      <g fill="#B22234">
        <path d="M0 0h28v1.54H0zM0 3.08h28v1.54H0zM0 6.16h28V7.7H0zM0 9.24h28v1.54H0zM0 12.32h28v1.54H0zM0 15.4h28v1.54H0zM0 18.46h28V20H0z" />
      </g>
      <path d="M0 0h12.3v10.78H0z" fill="#3C3B6E" />
      <g fill="#FFF">
        <circle cx="1.5" cy="1.4" r="0.38" />
        <circle cx="4.6" cy="1.4" r="0.38" />
        <circle cx="7.7" cy="1.4" r="0.38" />
        <circle cx="10.8" cy="1.4" r="0.38" />
        <circle cx="3" cy="3.6" r="0.38" />
        <circle cx="6.1" cy="3.6" r="0.38" />
        <circle cx="9.2" cy="3.6" r="0.38" />
        <circle cx="1.5" cy="5.8" r="0.38" />
        <circle cx="4.6" cy="5.8" r="0.38" />
        <circle cx="7.7" cy="5.8" r="0.38" />
        <circle cx="10.8" cy="5.8" r="0.38" />
        <circle cx="3" cy="8" r="0.38" />
        <circle cx="6.1" cy="8" r="0.38" />
        <circle cx="9.2" cy="8" r="0.38" />
      </g>
    </svg>
  )
}

export function AnnouncementBar() {
  return (
    <div className="announcement" role="note">
      <span className="announcement__phrase">
        <BrazilFlag />
        <span>Brazilian soul</span>
      </span>
      <Sparkles
        className="announcement__sparkle"
        size={14}
        aria-hidden="true"
      />
      <span className="announcement__phrase">
        <span>Handmade in {siteConfig.location}</span>
        <UnitedStatesFlag />
      </span>
    </div>
  )
}
