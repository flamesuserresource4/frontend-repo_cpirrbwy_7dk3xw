import { X } from 'lucide-react'
import { useMemo } from 'react'

export default function CartDrawer({ open, items, onClose, onCheckout, onInc, onDec }) {
  const subtotal = useMemo(() => items.reduce((sum, it) => sum + it.price * it.quantity, 0), [items])
  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-rose-900">Your Cart</h3>
          <button onClick={onClose}><X className="w-5 h-5" /></button>
        </div>
        <div className="p-4 space-y-4 max-h-[calc(100%-160px)] overflow-y-auto">
          {items.length === 0 && <p className="text-rose-800/70">Your cart is empty.</p>}
          {items.map((it) => (
            <div key={it.id} className="flex gap-3">
              <img src={it.images?.[0] || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&auto=format&fit=crop'} alt={it.title} className="w-20 h-20 rounded object-cover border"/>
              <div className="flex-1">
                <div className="font-semibold text-rose-900">{it.title}</div>
                <div className="text-sm text-rose-800/70">${it.price.toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => onDec(it)} className="px-2 rounded bg-rose-100">-</button>
                  <span>{it.quantity}</span>
                  <button onClick={() => onInc(it)} className="px-2 rounded bg-rose-100">+</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center justify-between text-rose-900 font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <button onClick={onCheckout} className="mt-4 w-full rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-3">Checkout</button>
          <p className="text-xs text-rose-800/70 mt-2">Secure payments powered by Stripe</p>
        </div>
      </div>
    </div>
  )
}
