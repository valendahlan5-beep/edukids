import { cx } from '../lib/utils'

export function Mascot({
  size = 120,
  className,
  mood = 'happy',
  withCap = true,
}: {
  size?: number
  className?: string
  mood?: 'happy' | 'wink' | 'thinking'
  withCap?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={cx('select-none', className)}
      role="img"
      aria-label="Kiki, maskot burung hantu EduKids"
    >
      <defs>
        <linearGradient id="owlBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#60a5fa" />
          <stop offset="1" stopColor="#2563eb" />
        </linearGradient>
        <linearGradient id="owlBelly" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#dbeafe" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="178" rx="52" ry="8" fill="#1e40af" opacity="0.12" />
      <path d="M55 78c-18 6-26 26-22 48 4 24 18 40 30 44-8-30-6-61-8-92z" fill="#1d4ed8" />
      <path d="M145 78c18 6 26 26 22 48-4 24-18 40-30 44 8-30 6-61 8-92z" fill="#1d4ed8" />
      <ellipse cx="100" cy="112" rx="56" ry="60" fill="url(#owlBody)" />
      <ellipse cx="100" cy="124" rx="38" ry="42" fill="url(#owlBelly)" />
      <path d="M72 64c6-18 20-28 28-28 8 0 22 10 28 28-10 12-20 16-28 16s-18-4-28-16z" fill="#1e3a8a" opacity="0.14" />
      {withCap && (
        <g>
          <path d="M58 52l42-22 42 22-42 18-42-18z" fill="#1e3a8a" />
          <path d="M70 60v13c0 8 14 14 30 14s30-6 30-14V60l-30 12-30-12z" fill="#1d4ed8" />
          <path d="M99 30v-8" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <circle cx="99" cy="20" r="4" fill="#fbbf24" />
          <path d="M142 52v26" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
          <circle cx="142" cy="82" r="5" fill="#fbbf24" />
        </g>
      )}
      <circle cx="78" cy="102" r="22" fill="#ffffff" />
      <circle cx="122" cy="102" r="22" fill="#ffffff" />
      <circle cx="80" cy="104" r="11" fill="#1e293b" />
      <circle cx="124" cy="104" r="11" fill="#1e293b" />
      <circle cx="84" cy="99" r="4" fill="#ffffff" />
      <circle cx="128" cy="99" r="4" fill="#ffffff" />
      {mood === 'wink' ? (
        <path d="M112 100c5 3 10 3 15 0" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : null}
      <path d="M100 112l-10 8 10 6 10-6-10-8z" fill="#f59e0b" />
      <path d="M88 136c4 5 8 7 12 7s8-2 12-7" stroke="#1d4ed8" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="86" cy="146" rx="5" ry="3" fill="#fb923c" opacity="0.5" />
      <ellipse cx="114" cy="146" rx="5" ry="3" fill="#fb923c" opacity="0.5" />
      <path d="M63 168l6-9M77 171l3-8M137 168l-6-9M123 171l-3-8" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
      {mood === 'thinking' && (
        <g>
          <circle cx="164" cy="46" r="4" fill="#cbd5e1" />
          <circle cx="173" cy="34" r="6" fill="#e2e8f0" />
          <text x="160" y="28" fontSize="22" fill="#f59e0b">?</text>
        </g>
      )}
    </svg>
  )
}

export function OwlBadge({ className }: { className?: string }) {
  return (
    <div className={cx('flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md', className)}>
      <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
        <circle cx="20" cy="22" r="14" fill="#fff" />
        <circle cx="15" cy="20" r="5" fill="#1e40af" />
        <circle cx="25" cy="20" r="5" fill="#1e40af" />
        <circle cx="15" cy="20" r="2" fill="#fff" />
        <circle cx="25" cy="20" r="2" fill="#fff" />
        <path d="M20 24l-3 3 3 2 3-2-3-3z" fill="#f59e0b" />
        <path d="M12 10l8-4 8 4-8 3-8-3z" fill="#1e293b" />
      </svg>
    </div>
  )
}
