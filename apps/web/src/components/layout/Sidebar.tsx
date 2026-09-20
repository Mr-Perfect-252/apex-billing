import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'

interface SidebarItem {
  to: string
  label: string
  icon: ReactNode
}

const items: SidebarItem[] = [
  {
    to: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="9" rx="1.5" />
        <rect x="14" y="3" width="7" height="5" rx="1.5" />
        <rect x="14" y="12" width="7" height="9" rx="1.5" />
        <rect x="3" y="16" width="7" height="5" rx="1.5" />
      </svg>
    ),
  },
  {
    to: '/products',
    label: 'Products',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    to: '/usage',
    label: 'Usage',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-6 4 3 5-8" />
      </svg>
    ),
  },
  {
    to: '/billing',
    label: 'Billing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="6" width="20" height="14" rx="2.5" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
]

const bottomItems: SidebarItem[] = [
  {
    to: '/settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06A1.65 1.65 0 004.6 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.6a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06A1.65 1.65 0 0019.4 9c.36.14.68.36 1.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
]

/**
 * Slim icon-rail sidebar for authenticated app surfaces. Active state is
 * shown with a solid white fill + black icon (never a color glow) plus a
 * left-edge marker bar, so it stays legible in a strictly monochrome
 * system.
 */
export function Sidebar() {
  const itemClass = ({ isActive }: { isActive: boolean }) =>
    [
      'group relative flex h-[42px] w-[42px] items-center justify-center rounded-[10px] transition-colors',
      isActive ? 'bg-white text-black' : 'text-ink-tertiary hover:bg-white/5 hover:text-white',
    ].join(' ')

  return (
    <nav className="flex w-[68px] flex-shrink-0 flex-col items-center gap-1.5 border-r border-line bg-surface-1 py-4">
      {items.map((item) => (
        <NavLink key={item.to} to={item.to} className={itemClass}>
          <span className="h-[19px] w-[19px]">{item.icon}</span>
          <span className="pointer-events-none absolute left-[56px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md border border-line-strong bg-surface-3 px-2.5 py-1.5 text-[12.5px] font-medium text-white opacity-0 shadow-none transition-opacity group-hover:opacity-100">
            {item.label}
          </span>
        </NavLink>
      ))}
      <div className="flex-1" />
      {bottomItems.map((item) => (
        <NavLink key={item.to} to={item.to} className={itemClass}>
          <span className="h-[19px] w-[19px]">{item.icon}</span>
        </NavLink>
      ))}
    </nav>
  )
}
