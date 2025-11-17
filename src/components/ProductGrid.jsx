import { useEffect, useState } from 'react'

export default function ProductGrid({ onAddToCart }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${base}/api/products`)
        const data = await res.json()
        setProducts(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="py-16 text-center">Loading products…</div>

  return (
    <div className="max-w-7xl mx-auto px-6 py-16" id="shop">
      <h2 className="text-3xl font-bold text-rose-900 mb-8">Bestsellers</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(p => (
          <div key={p.id} className="group bg-white rounded-2xl border border-rose-200 overflow-hidden shadow-sm">
            <div className="aspect-[4/3] bg-rose-50">
              <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop'} alt={p.title} className="w-full h-full object-cover"/>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-rose-900 group-hover:underline">{p.title}</h3>
              <p className="text-sm text-rose-800/70 line-clamp-2 mt-1">{p.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xl font-bold text-rose-900">${p.price.toFixed(2)}</div>
                <button onClick={() => onAddToCart(p)} className="rounded-full bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2">Add to cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
