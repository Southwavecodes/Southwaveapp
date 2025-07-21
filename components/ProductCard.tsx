'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ShoppingCart, Star } from 'lucide-react'
import { Product } from '@/types/merch'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product, options: any) => void
  index: number
}

export default function ProductCard({ product, onAddToCart, index }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '')
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100)
  }

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      toast.error('Please select a size')
      return
    }
    if (product.colors && !selectedColor) {
      toast.error('Please select a color')
      return
    }

    onAddToCart(product, {
      quantity,
      selectedSize,
      selectedColor,
    })

    toast.success(`Added ${product.name} to cart!`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="music-card rounded-xl overflow-hidden group hover:transform hover:scale-105 transition-all duration-300 p-4 md:p-6"
    >
      <div className="relative">
        <div 
          className="aspect-square relative cursor-pointer"
          onClick={() => setCurrentImageIndex((prev) => (prev + 1) % product.images.length)}
        >
          <Image
            src={product.images[currentImageIndex]}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.featured && (
            <div className="absolute top-3 left-3">
              <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
                <Star size={12} className="mr-1" />
                Featured
              </span>
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
        </div>
        
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, imgIndex) => (
              <button
                key={imgIndex}
                onClick={() => setCurrentImageIndex(imgIndex)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImageIndex === imgIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{product.name}</h3>
        <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-2">{product.description}</p>
        
        <div className="text-xl md:text-2xl font-bold text-primary-400 mb-4">
          {formatPrice(product.price)}
        </div>

        {product.sizes && (
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Size:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedSize === size
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.colors && (
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Color:
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                    selectedColor === color
                      ? 'bg-primary-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <label className="block text-gray-300 text-sm font-medium">
            Quantity:
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white"
            >
              -
            </button>
            <span className="w-8 text-center text-white">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
            product.inStock
              ? 'bg-primary-600 hover:bg-primary-700 text-white transform hover:scale-105'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={20} className="mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </motion.div>
  )
}