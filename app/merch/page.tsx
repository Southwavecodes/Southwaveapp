'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Star, Filter, X } from 'lucide-react'
import { Product } from '@/types/merch'
import ProductCard from '@/components/ProductCard'
import Cart from '@/components/Cart'

export default function MerchPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [cartItems, setCartItems] = useState<any[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const products: Product[] = [
    {
      id: 'hoodie-1',
      name: 'Southwave Logo Hoodie',
      description: 'Premium cotton blend hoodie with embroidered Southwave logo. Perfect for those late-night studio sessions.',
      price: 6500, // $65.00 in cents
      currency: 'usd',
      images: ['/images/hoodie-black.jpg', '/images/hoodie-detail.jpg'],
      category: 'apparel',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Navy', 'Charcoal'],
      inStock: true,
      featured: true,
    },
    {
      id: 'tshirt-1',
      name: 'Deep Currents Tour Tee',
      description: 'Limited edition tour merchandise. Soft cotton tee with unique tour artwork.',
      price: 3500, // $35.00
      currency: 'usd',
      images: ['/images/tshirt-white.jpg', '/images/tshirt-black.jpg'],
      category: 'apparel',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['White', 'Black'],
      inStock: true,
      featured: true,
    },
    {
      id: 'vinyl-1',
      name: 'Deep Currents Vinyl',
      description: '180g vinyl pressing of the acclaimed Deep Currents album. Includes digital download.',
      price: 4500, // $45.00
      currency: 'usd',
      images: ['/images/vinyl-deep-currents.jpg'],
      category: 'music',
      inStock: true,
      featured: false,
    },
    {
      id: 'cap-1',
      name: 'Southwave Snapback',
      description: 'Embroidered snapback hat with adjustable fit. Classic streetwear style.',
      price: 2800, // $28.00
      currency: 'usd',
      images: ['/images/cap-black.jpg', '/images/cap-navy.jpg'],
      category: 'accessories',
      colors: ['Black', 'Navy'],
      inStock: true,
    },
    {
      id: 'poster-1',
      name: 'Tour Poster Set',
      description: 'Collection of high-quality concert posters from recent tours.',
      price: 2000, // $20.00
      currency: 'usd',
      images: ['/images/poster-set.jpg'],
      category: 'accessories',
      inStock: true,
    },
    {
      id: 'digital-1',
      name: 'Producer Pack Vol.1',
      description: 'Exclusive sample pack with stems, loops, and MIDI files from Southwave tracks.',
      price: 1500, // $15.00
      currency: 'usd',
      images: ['/images/producer-pack.jpg'],
      category: 'digital',
      inStock: true,
    },
  ]

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'apparel', name: 'Apparel' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'music', name: 'Music' },
    { id: 'digital', name: 'Digital' },
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const featuredProducts = products.filter(product => product.featured)

  const addToCart = (product: Product, options: any) => {
    const existingItem = cartItems.find(item => 
      item.product.id === product.id && 
      item.selectedSize === options.selectedSize && 
      item.selectedColor === options.selectedColor
    )

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.product.id === product.id && 
        item.selectedSize === options.selectedSize && 
        item.selectedColor === options.selectedColor
          ? { ...item, quantity: item.quantity + options.quantity }
          : item
      ))
    } else {
      setCartItems([...cartItems, {
        product,
        quantity: options.quantity,
        selectedSize: options.selectedSize,
        selectedColor: options.selectedColor,
      }])
    }
  }

  const updateCartItem = (itemIndex: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter((_, index) => index !== itemIndex))
    } else {
      setCartItems(cartItems.map((item, index) =>
        index === itemIndex ? { ...item, quantity } : item
      ))
    }
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 pt-8 sm:pt-12 md:pt-16">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Official Merch
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Exclusive Southwave merchandise, vinyl records, and digital content
          </p>
        </motion.div>

        {/* Cart Button */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed top-20 right-4 z-40"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-primary-600 hover:bg-primary-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {cartItems.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </button>
        </motion.div>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
              <Star className="mr-3 text-yellow-400" size={32} />
              Featured Items
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* All Products */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        {/* Cart Sidebar */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
          onUpdateItem={updateCartItem}
          total={getCartTotal()}
          formatPrice={formatPrice}
        />
      </div>
    </div>
  )
}