import { Link, NavLink } from 'react-router-dom'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { Avatar } from '../ui/Avatar'
import { isClerkConfigured } from '../../lib/env'

const links = [
  { to: '/products', label: 'Products' },
  { to: '/#features', label: 'Features' },
  { to: '/#pricing', label: 'Pricing' },
]

/**
 * Marketing-site header. Public, unauthenticated chrome for the landing
 * page and other pre-login surfaces.
 */
export function MarketingNav() {
  const { user } = isClerkConfigured ? useUser() : { user: null }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-8">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className="rounded-md px-3.5 py-2 text-[14.5px] font-medium text-ink-secondary transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {isClerkConfigured ? (
            <>
              <SignedOut>
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="primary" size="sm">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <Avatar name={user?.fullName ?? 'User'} size={32} />
                </Link>
              </SignedIn>
            </>
          ) : (
            <>
              <Link to="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
