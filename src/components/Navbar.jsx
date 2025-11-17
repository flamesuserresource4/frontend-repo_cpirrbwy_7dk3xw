import { ShoppingBag, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar({ cartCount, onOpenCart }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-rose-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setOpen(!open)}>
            <Menu className="w-6 h-6 text-rose-700" />
          </button>
          <a href="/" className="text-2xl font-extrabold bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent">
            skinnyfittea.com
          </a>
        </div>
        <nav className="hidden lg:flex items-center gap-8 text-rose-800">
          <a href="#shop" className="hover:text-rose-900">Shop</a>
          <a href="#about" className="hover:text-rose-900">About</a>
          <a href="#reviews" className="hover:text-rose-900">Reviews</a>
          <a href="#faq" className="hover:text-rose-900">FAQ</a>
        </nav>
        <button onClick={onOpenCart} className="relative">
          <ShoppingBag className="w-6 h-6 text-rose-700" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-rose-600 text-white rounded-full px-1.5 py-0.5">{cartCount}</span>
          )}
        </button>
      </div>
      {open && (
        <div className="lg:hidden px-6 pb-4 space-y-2 text-rose-800">
          <a href="#shop" className="block">Shop</a>
          <a href="#about" className="block">About</a>
          <a href="#reviews" className="block">Reviews</a>
          <a href="#faq" className="block">FAQ</a>
        </div>
      )}
    </div>
  )
}
