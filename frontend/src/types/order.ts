import type { CartItem } from '../context/CartContext'
import type { CheckoutData } from './checkout'

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'

export interface Order {
  id: string
  customer: CheckoutData['customer']
  shipping: CheckoutData['shipping']
  items: CartItem[]
  totalItems: number
  totalAmount: number
  status: OrderStatus
  createdAt: string
}
