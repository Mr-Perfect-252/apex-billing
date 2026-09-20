interface ConfigNoticeProps {
  service: string
  envVar: string
}

/**
 * Shown instead of crashing when a required env var (Clerk publishable
 * key, Supabase URL/anon key) hasn't been set yet. Keeps the app runnable
 * end-to-end during scaffolding before real credentials exist.
 */
export function ConfigNotice({ service, envVar }: ConfigNoticeProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-0 px-6">
      <div className="max-w-[440px] rounded-lg border border-line-strong bg-surface-1 p-8 text-center">
        <h2 className="mb-2.5 text-[18px] font-bold text-white">{service} isn&apos;t configured yet</h2>
        <p className="mb-4 text-[14px] leading-relaxed text-ink-secondary">
          Set <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">{envVar}</code> in
          your <code className="rounded bg-white/10 px-1.5 py-0.5 text-white">.env</code> file to
          enable this page. See <code className="text-white">.env.example</code> for the full list.
        </p>
      </div>
    </div>
  )
}
