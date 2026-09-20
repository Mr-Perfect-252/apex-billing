import { SignUp } from '@clerk/clerk-react'
import { Logo } from '../components/ui/Logo'
import { isClerkConfigured } from '../lib/env'
import { ConfigNotice } from '../components/layout/ConfigNotice'

export default function SignUpPage() {
  if (!isClerkConfigured) {
    return <ConfigNotice service="Clerk" envVar="VITE_CLERK_PUBLISHABLE_KEY" />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-surface-0 px-4">
      <Logo size={34} />
      <SignUp
        appearance={{
          variables: {
            colorPrimary: '#ffffff',
            colorBackground: '#0a0a0a',
            colorText: '#ffffff',
            colorTextSecondary: 'rgba(255,255,255,0.64)',
            colorInputBackground: '#000000',
            colorInputText: '#ffffff',
            borderRadius: '10px',
            fontFamily: 'Inter, sans-serif',
          },
          elements: {
            card: 'border border-white/16 shadow-none',
            headerTitle: 'text-white',
            headerSubtitle: 'text-white/64',
            formButtonPrimary:
              'bg-white text-black hover:bg-white/90 shadow-none normal-case text-[14px]',
            socialButtonsBlockButton: 'border border-white/16 text-white hover:bg-white/5',
            footerActionLink: 'text-white font-semibold',
            dividerLine: 'bg-white/10',
            dividerText: 'text-white/40',
          },
        }}
      />
    </div>
  )
}
