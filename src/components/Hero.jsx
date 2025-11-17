import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Hero({ onShopClick }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 via-rose-50 to-white" />
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 sm:pt-28 sm:pb-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 bg-clip-text text-transparent"
            >
              Skinny Fit Tea
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mt-6 text-lg sm:text-xl text-rose-800/80"
            >
              Bloat-busting, metabolism-loving blends crafted for women. Feel lighter, look tighter, glow brighter.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <button
                onClick={onShopClick}
                className="inline-flex items-center gap-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-3 shadow-lg shadow-rose-600/30"
              >
                <Sparkles className="w-5 h-5" /> Shop Bestsellers
              </button>
              <a
                href="#about"
                className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur hover:bg-white text-rose-700 font-semibold px-6 py-3 border border-rose-200"
              >
                Why it works
              </a>
            </motion.div>
            <div className="mt-8 flex items-center gap-6 text-rose-900/70">
              <div className="text-sm"><span className="font-bold">Clinically-inspired</span> formulas</div>
              <div className="text-sm"><span className="font-bold">Vegan</span> & Non-GMO</div>
              <div className="text-sm"><span className="font-bold">Free shipping</span> $50+</div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] w-full rounded-3xl bg-[url('https://images.unsplash.com/photo-1547514701-42782101795e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center shadow-2xl border border-rose-200" />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 text-rose-700">
              <p className="font-bold">Drink Sexy</p>
              <p className="text-sm">Daily ritual • Visible results</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
