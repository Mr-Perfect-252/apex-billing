import type { ReactNode } from 'react'

/** Per-product glyph. One consistent icon per product slug, monochrome. */
export function productIcon(slug: string): ReactNode {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2 } as const
  switch (slug) {
    case 'apex-flow':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" />
        </svg>
      )
    case 'apex-insights':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M3 3v18h18" />
          <path d="M7 15l4-6 4 3 5-8" />
        </svg>
      )
    case 'apex-ledger':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      )
    case 'apex-studio':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="4" width="18" height="14" rx="2" />
          <path d="M7 21h10M9 18v3M15 18v3" />
        </svg>
      )
    case 'apex-pulse':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      )
    case 'apex-vault':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      )
  }
}
