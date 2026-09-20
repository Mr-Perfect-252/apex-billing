import type { ReactNode } from 'react'
import { AppTopbar } from './AppTopbar'
import { Sidebar } from './Sidebar'

interface AppShellProps {
  crumb: string
  children: ReactNode
}

/** Shared authenticated-app frame: topbar + icon sidebar + scrollable content. */
export function AppShell({ crumb, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface-0">
      <AppTopbar crumb={crumb} />
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-[1240px] px-8 py-9 pb-24">{children}</div>
        </main>
      </div>
    </div>
  )
}
