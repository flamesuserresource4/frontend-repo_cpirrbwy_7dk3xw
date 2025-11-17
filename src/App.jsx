import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])

  const addToCart = (p) => {
    setCartItems((prev) => {
      const ex = prev.find(i => i.id === p.id)
      if (ex) return prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...p, quantity: 1 }]
    })
    setCartOpen(true)
  }

  const inc = (p) => setCartItems((prev) => prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
  const dec = (p) => setCartItems((prev) => prev.flatMap(i => i.id === p.id ? (i.quantity > 1 ? [{ ...i, quantity: i.quantity - 1 }] : []) : [i]))

  const startCheckout = async () => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    try {
      const items = cartItems.map(ci => ({ product_id: ci.id, quantity: ci.quantity }))
      const success_url = window.location.origin + '/?checkout=success'
      const cancel_url = window.location.origin + '/?checkout=cancel'
      const res = await fetch(`${base}/api/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, success_url, cancel_url })
      })
      if (!res.ok) throw new Error('Checkout failed')
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (e) {
      alert('Checkout not available. Please try again later.')
      console.error(e)
    }
  }

  // seed demo products on first load if none exist
  useEffect(() => {
    const seed = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/products`)
        const data = await res.json()
        if (!Array.isArray(data) || data.length > 0) return
        const demo = [
          {
            title: 'Detox Slim Tea',
            description: 'A gentle daily detox to debloat and define.',
            price: 29.0,
            images: ['https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1200&auto=format&fit=crop']
          },
          {
            title: 'Metabolism Booster',
            description: 'Green tea blend that fires up fat burn.',
            price: 34.0,
            images: ['https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop']
          },
          {
            title: 'Night Cleanse',
            description: 'Wind-down cleanse for a flatter AM tummy.',
            price: 32.0,
            images: ['https://images.unsplash.com/photo-1490914327627-9fe8d52f4d90?q=80&w=1200&auto=format&fit=crop']
          }
        ]
        await Promise.all(demo.map(d => fetch(`${base}/api/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(d) })))
      } catch (e) {
        console.warn('Seeding skipped', e)
      }
    }
    seed()
  }, [])

  return (
    <div className="min-h-screen bg-white text-rose-900">
      <Navbar cartCount={cartItems.reduce((s,i)=>s+i.quantity,0)} onOpenCart={() => setCartOpen(true)} />
      <Hero onShopClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })} />
      <ProductGrid onAddToCart={addToCart} />
      <footer className="mt-24 border-t border-rose-200">
        <div className="max-w-7xl mx-auto px-6 py-12 text-sm text-rose-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} skinnyfittea.com — All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#faq">FAQ</a>
            <a href="#shipping">Shipping</a>
            <a href="#returns">Returns</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      <CartDrawer open={cartOpen} items={cartItems} onClose={() => setCartOpen(false)} onCheckout={startCheckout} onInc={inc} onDec={dec} />
    </div>
  )
}

export default App
