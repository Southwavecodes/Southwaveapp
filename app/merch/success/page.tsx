'use client'

import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail } from 'lucide-react'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="mb-8"
          >
            <CheckCircle size={80} className="text-green-400 mx-auto" />
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Order Confirmed!
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Thank you for your purchase! Your order has been successfully processed.
          </p>

          {sessionId && (
            <div className="bg-white/10 rounded-lg p-6 mb-8 text-left">
              <h3 className="text-lg font-semibold text-white mb-2">Order Details</h3>
              <p className="text-gray-300 text-sm">
                Order ID: <span className="font-mono">{sessionId}</span>
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 rounded-lg p-6">
              <Package size={40} className="text-primary-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Shipping</h3>
              <p className="text-gray-300 text-sm">
                Your order will be processed within 1-2 business days. You'll receive a tracking number via email once shipped.
              </p>
            </div>

            <div className="bg-white/10 rounded-lg p-6">
              <Mail size={40} className="text-primary-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email Confirmation</h3>
              <p className="text-gray-300 text-sm">
                A confirmation email with your receipt and order details has been sent to your email address.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/merch"
              className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}