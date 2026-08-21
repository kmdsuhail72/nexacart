import type { Order } from '../types/order'

const ORDERS_STORAGE_KEY = 'nexacart-orders'

function loadOrders(): Order[] {
  try {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY)

    if (!storedOrders) {
      return []
    }

    return JSON.parse(storedOrders) as Order[]
  } catch {
    return []
  }
}

function saveOrders(orders: Order[]) {
  localStorage.setItem(
    ORDERS_STORAGE_KEY,
    JSON.stringify(orders),
  )
}

export function createOrder(order: Order): Order {
  const orders = loadOrders()

  const updatedOrders = [...orders, order]

  saveOrders(updatedOrders)

  return order
}

export function getOrderById(
  orderId: string,
): Order | undefined {
  const orders = loadOrders()

  return orders.find((order) => order.id === orderId)
}

export function getOrders(): Order[] {
  return loadOrders()
}
