'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Music, Calendar, ShoppingBag } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Home() {
  const [typed, setTyped] = useState('')
  const fullText = 'SOUTHWAVE'

  useEffect(() => {
    let i = 0
    let interval: NodeJS.Timeout | null = null
    let timeout: NodeJS.Timeout | null = null

    const startTyping = () => {
      setTyped('')
      i = 0
      interval = setInterval(() => {
        setTyped(fullText.slice(0, i + 1))
        i++
        if (i === fullText.length) {
          clearInterval(interval!)
          timeout = setTimeout(() => {
            startTyping()
          }, 3000)
        }
      }, 120)
    }

    startTyping()
    return () => {
      if (interval) clearInterval(interval)
      if (timeout) clearTimeout(timeout)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700">
      <div className="pt-16">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="mb-8">
                <Image
                  src="/images/southwave-profile.jpg"
                  alt="Southwave Artist Profile"
                  width={200}
                  height={200}
                  className="mx-auto rounded-full border-4 border-white/20 shadow-2xl"
                  priority
                />
              </div>
              
              <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight southwave-typewriter font-display flex items-center justify-center">
                <span>{typed}</span>
                <span className="border-r-2 border-white animate-pulse ml-1 h-16 md:h-20" />
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Producer, songwriter, rapper; Southwave is an industry heavyweight climbing through the ranks, he is currently working on his album.
                Please stay tuned!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link
                  href="/music"
                  className="inline-flex items-center px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Play className="mr-2" size={20} />
                  Listen Now
                </Link>
                
                <Link
                  href="/concerts"
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  <Calendar className="mr-2" size={20} />
                  Upcoming Shows
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About Southwave
              </h2>
              <div className="max-w-4xl mx-auto text-gray-300 text-lg leading-relaxed space-y-4">
                <p>
                  Southwave is an innovative electronic music artist known for crafting immersive sonic journeys that transport listeners to otherworldly realms. With a unique blend of deep house rhythms, ambient textures, and progressive elements, Southwave has carved out a distinctive space in the electronic music landscape.
                </p>
                <p>
                  Drawing inspiration from ocean waves, coastal atmospheres, and the interplay between light and shadow, each track tells a story of movement, emotion, and transcendence. The music resonates with audiences seeking both dancefloor energy and introspective moments.
                </p>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-center p-6 music-card rounded-xl"
              >
                <Music className="mx-auto mb-4 text-primary-400" size={48} />
                <h3 className="text-xl font-semibold text-white mb-3">Latest Releases</h3>
                <p className="text-gray-300 mb-4">
                  Discover the newest tracks and albums available on all streaming platforms.
                </p>
                <Link
                  href="/music"
                  className="inline-block text-primary-400 hover:text-primary-300 font-medium"
                >
                  Explore Music →
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center p-6 music-card rounded-xl"
              >
                <Calendar className="mx-auto mb-4 text-primary-400" size={48} />
                <h3 className="text-xl font-semibold text-white mb-3">Live Performances</h3>
                <p className="text-gray-300 mb-4">
                  Experience Southwave live at upcoming concerts and festivals.
                </p>
                <Link
                  href="/concerts"
                  className="inline-block text-primary-400 hover:text-primary-300 font-medium"
                >
                  View Dates →
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center p-6 music-card rounded-xl"
              >
                <ShoppingBag className="mx-auto mb-4 text-primary-400" size={48} />
                <h3 className="text-xl font-semibold text-white mb-3">Official Merchandise</h3>
                <p className="text-gray-300 mb-4">
                  Shop exclusive Southwave apparel and limited edition items.
                </p>
                <Link
                  href="/merch"
                  className="inline-block text-primary-400 hover:text-primary-300 font-medium"
                >
                  Shop Now →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}