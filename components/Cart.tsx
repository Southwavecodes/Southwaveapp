'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import { getStripe } from '@/lib/stripe'
import toast from 'react-hot-toast'

interface CartProps {
  isOpen: boolean
  onClose: () => void
  items: any[]
  onUpdateItem: (index: number, quantity: number) => void
  total: number
  formatPrice: (price: number) => string
}

export default function Cart({ isOpen, onClose, items, onUpdateItem, total, formatPrice }: CartProps) {
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    setIsCheckingOut(true)

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map(item => ({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.product.name,
                description: `${item.selectedSize ? `Size: ${item.selectedSize}` : ''} ${item.selectedColor ? `Color: ${item.selectedColor}` : ''}`.trim(),
                images: [item.product.images[0]],
              },
              unit_amount: item.product.price,
            },
            quantity: item.quantity,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = await response.json()
      const stripe = await getStripe()

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          throw error
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Failed to proceed to checkout. Please try again.')
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Cart Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 z-50 flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white flex items-center">
                <ShoppingBag size={24} className="mr-2" />
                Your Cart ({items.reduce((total, item) => total + item.quantity, 0)})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center text-gray-400 mt-12">
                  <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <motion.div
                      key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-start space-x-4 p-4 bg-white/5 rounded-lg"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm mb-1">
                          {item.product.name}
                        </h3>
                        {item.selectedSize && (
                          <p className="text-gray-400 text-xs">Size: {item.selectedSize}</p>
                        )}
                        {item.selectedColor && (
                          <p className="text-gray-400 text-xs">Color: {item.selectedColor}</p>
                        )}
                        <p className="text-primary-400 font-semibold text-sm">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateItem(index, item.quantity - 1)}
                            className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white text-sm"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-white text-sm w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateItem(index, item.quantity + 1)}
                            className="w-6 h-6 bg-white/10 hover:bg-white/20 rounded-md flex items-center justify-center text-white text-sm"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          onClick={() => onUpdateItem(index, 0)}
                          className="text-red-400 hover:text-red-300 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-700 p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Total:</span>
                  <span className="text-2xl font-bold text-primary-400">
                    {formatPrice(total)}
                  </span>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {isCheckingOut ? 'Processing...' : 'Checkout'}
                </button>

                <p className="text-gray-400 text-xs text-center mt-2">
                  Secure checkout powered by Stripe
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}