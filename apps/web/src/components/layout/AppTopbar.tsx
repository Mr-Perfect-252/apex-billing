import { Link } from 'react-router-dom'
import { SignedIn, UserButton, useUser } from '@clerk/clerk-react'
import { Logo } from '../ui/Logo'
import { Avatar } from '../ui/Avatar'
import { isClerkConfigured } from '../../lib/env'

interface AppTopbarProps {
  crumb: string
}

/**
 * Top bar for authenticated app surfaces (dashboard, products, etc).
 * Delegates the account menu to Clerk's <UserButton /> once configured;
 * falls back to a plain avatar placeholder during local scaffolding.
 */
export function AppTopbar({ crumb }: AppTopbarProps) {
  const { user } = isClerkConfigured ? useUser() : { user: null }

  return (
    <div className="sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-line bg-black/85 px-5 backdrop-blur-md">
      <div className="flex items-center gap-3.5">
        <Link to="/">
          <Logo size={26} />
        </Link>
        <div className="flex items-center gap-2 text-[13.5px] text-ink-tertiary">
          <span className="opacity-50">/</span>
          <span className="font-semibold text-white">{crumb}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Search"
          className="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[17px] w-[17px]">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-8 w-8 items-center justify-center rounded-md text-ink-secondary hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-[17px] w-[17px]">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 01-3.4 0" />
          </svg>
        </button>

        {isClerkConfigured ? (
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        ) : (
          <Avatar name={user?.fullName ?? 'Jordan Diaz'} size={32} />
        )}
      </div>
    </div>
  )
}
