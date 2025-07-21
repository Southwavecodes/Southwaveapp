export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: string
  images: string[]
  category: 'apparel' | 'accessories' | 'music' | 'digital'
  sizes?: string[]
  colors?: string[]
  inStock: boolean
  featured?: boolean
  stripeProductId?: string
  stripePriceId?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  currency: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  customerEmail: string
  shippingAddress: {
    name: string
    line1: string
    line2?: string
    city: string
    state: string
    postal_code: string
    country: string
  }
  createdAt: Date
}