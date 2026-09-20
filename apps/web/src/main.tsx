import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App'
import { env, isClerkConfigured } from './lib/env'
import './index.css'

const root = createRoot(document.getElementById('root')!)

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

root.render(
  <StrictMode>
    {isClerkConfigured ? (
      <ClerkProvider publishableKey={env.clerkPublishableKey}>{app}</ClerkProvider>
    ) : (
      app
    )}
  </StrictMode>,
)
