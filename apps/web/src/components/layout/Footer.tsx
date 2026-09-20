import { Link } from 'react-router-dom'
import { Logo } from '../ui/Logo'

const columns = [
  {
    heading: 'Product',
    links: ['Apex Flow', 'Apex Insights', 'Apex Ledger', 'Pricing'],
  },
  {
    heading: 'Company',
    links: ['About', 'Careers', 'Blog', 'Contact'],
  },
  {
    heading: 'Resources',
    links: ['Documentation', 'Status', 'Changelog', 'Support'],
  },
  {
    heading: 'Legal',
    links: ['Privacy', 'Terms', 'Security'],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1200px] px-8 py-16">
        <div className="mb-14 grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-[260px] text-sm leading-relaxed text-ink-tertiary">
              The unified platform for discovering, purchasing, and accessing every Apex
              product — one ecosystem, one account.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.heading}>
              <h4 className="mb-4 text-[12.5px] font-semibold uppercase tracking-wide text-ink-tertiary">
                {col.heading}
              </h4>
              <div className="flex flex-col gap-3">
                {col.links.map((label) => (
                  <Link key={label} to="#" className="text-sm text-ink-secondary hover:text-white">
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-7 text-[13px] text-ink-tertiary">
          <span>© 2026 Apex Hub Labs. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
