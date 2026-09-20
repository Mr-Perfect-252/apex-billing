import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Plans from './pages/Plans'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/products/:slug/plans" element={<Plans />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
    </Routes>
  )
}
