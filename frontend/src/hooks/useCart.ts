import { useContext } from 'react'
import { CartContext } from '../context/CartContextDefinition'

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
