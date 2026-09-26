import { useId } from 'react'
import './pandaTheme.css'
import './cutePanda.css'

export default function PandaMascot({ variant = 'default', label = 'Cute panda' }) {
  const uid = useId().replace(/:/g, '')
  return <div className={`panda-mascot panda-${variant}`} role="img" aria-label={label}>
    <svg className="cute-panda-svg" viewBox="0 0 180 210" aria-hidden="true">
      <defs>
        <linearGradient id={`fur-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#dcebe3"/></linearGradient>
        <linearGradient id={`mint-${uid}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#b8f4d8"/><stop offset="1" stopColor="#4f9f78"/></linearGradient>
        <filter id={`shadow-${uid}`} x="-40%" y="-40%" width="180%" height="200%"><feDropShadow dx="0" dy="8" stdDeviation="7" floodOpacity=".28"/></filter>
      </defs>
      <ellipse className="cute-panda-shadow" cx="90" cy="197" rx="58" ry="10" fill="#000" opacity=".28"/>
      <g filter={`url(#shadow-${uid})`}>
        <circle className="cute-ear cute-ear-left" cx="42" cy="49" r="27" fill="#101814"/>
        <circle className="cute-ear cute-ear-right" cx="138" cy="49" r="27" fill="#101814"/>
        <ellipse className="cute-panda-body" cx="90" cy="147" rx="57" ry="58" fill={`url(#fur-${uid})`} stroke="#bcd5c8" strokeWidth="3"/>
        <ellipse className="cute-leg" cx="58" cy="184" rx="24" ry="18" fill="#111915" transform="rotate(-10 58 184)"/>
        <ellipse className="cute-leg" cx="122" cy="184" rx="24" ry="18" fill="#111915" transform="rotate(10 122 184)"/>
        <ellipse className="cute-arm cute-arm-left" cx="42" cy="139" rx="20" ry="38" fill="#111915" transform="rotate(24 42 139)"/>
        <ellipse className="cute-arm cute-arm-right" cx="138" cy="133" rx="20" ry="38" fill="#111915" transform="rotate(-35 138 133)"/>
        <ellipse className="cute-panda-head" cx="90" cy="80" rx="68" ry="61" fill={`url(#fur-${uid})`} stroke="#bcd5c8" strokeWidth="3"/>
        <ellipse className="cute-eye-patch" cx="60" cy="74" rx="20" ry="25" fill="#121a16" transform="rotate(22 60 74)"/>
        <ellipse className="cute-eye-patch" cx="120" cy="74" rx="20" ry="25" fill="#121a16" transform="rotate(-22 120 74)"/>
        <g className="cute-eyes">
          <ellipse cx="62" cy="74" rx="8" ry="11" fill="#fff"/><ellipse cx="118" cy="74" rx="8" ry="11" fill="#fff"/>
          <ellipse className="cute-pupil" cx="64" cy="77" rx="4.5" ry="6.5" fill="#17231d"/><ellipse className="cute-pupil" cx="116" cy="77" rx="4.5" ry="6.5" fill="#17231d"/>
          <circle cx="66" cy="74" r="1.8" fill="#fff"/><circle cx="118" cy="74" r="1.8" fill="#fff"/>
        </g>
        <ellipse className="cute-cheek" cx="45" cy="98" rx="12" ry="6" fill="#74cfa8" opacity=".65"/>
        <ellipse className="cute-cheek" cx="135" cy="98" rx="12" ry="6" fill="#74cfa8" opacity=".65"/>
        <ellipse cx="90" cy="94" rx="24" ry="19" fill="#fff" opacity=".9"/>
        <path d="M82 89 Q90 82 98 89 Q97 99 90 100 Q83 99 82 89Z" fill="#111915"/>
        <path className="cute-smile" d="M90 100 Q80 109 73 102 M90 100 Q100 109 107 102" fill="none" stroke="#18231e" strokeWidth="3" strokeLinecap="round"/>
        <path className="cute-heart" d="M90 145 C75 128 57 143 65 158 L90 180 L115 158 C123 143 105 128 90 145Z" fill={`url(#mint-${uid})`}/>
        <circle cx="47" cy="186" r="4" fill="#6ab48f"/><circle cx="133" cy="186" r="4" fill="#6ab48f"/>
      </g>
    </svg>
  </div>
}

export function PandaCompanion() {
  return <div className="panda-companion" aria-hidden="true"><PandaMascot variant="mini" /><span>Panda Ezhil 🐼</span></div>
}
