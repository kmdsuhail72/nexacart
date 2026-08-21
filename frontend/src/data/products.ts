import type { Product } from '../types/product'

export const products: Product[] = [
  {
    id: 'product-001',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with active noise cancellation.',
    price: 4999,
    currency: 'INR',
    imageUrl: '/products/headphones.jpg',
    category: 'Electronics',
    stock: 25,
  },
  {
    id: 'product-002',
    name: 'Smart Watch',
    description: 'Smart watch with fitness tracking and notifications.',
    price: 6999,
    currency: 'INR',
    imageUrl: '/products/smart-watch.jpg',
    category: 'Electronics',
    stock: 18,
  },
  {
    id: 'product-003',
    name: 'Running Shoes',
    description: 'Lightweight running shoes designed for everyday training.',
    price: 3499,
    currency: 'INR',
    imageUrl: '/products/running-shoes.jpg',
    category: 'Fashion',
    stock: 40,
  },
]
