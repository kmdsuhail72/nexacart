import { useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Product } from '../types/product'
import { CartContext } from './CartContextDefinition'

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartContextValue {
  items: CartItem[]
  cartCount: number
  cartTotal: number
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearCart: () => void
}

interface CartProviderProps {
  children: ReactNode
}

const CART_STORAGE_KEY = 'nexacart-cart'

function loadCart(): CartItem[] {
  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)

    if (!storedCart) {
      return []
    }

    return JSON.parse(storedCart) as CartItem[]
  } catch {
    return []
  }
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>(loadCart)

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  }, [items])

  function addToCart(product: Product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      )

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentItems, { product, quantity: 1 }]
    })
  }

  function removeFromCart(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    )
  }

  function increaseQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    )
  }

  function decreaseQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function clearCart() {
    setItems([])
  }

  const cartCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  )

  const cartTotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [items],
  )

  const value: CartContextValue = {
    items,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
