import { useState } from 'react'
import ProductCard from '../../components/product/ProductCard'
import { products } from '../../data/products'
import type { Product } from '../../types/product'

function ProductsPage() {
  const [cart, setCart] = useState<Product[]>([])

  function handleAddToCart(product: Product) {
    setCart((currentCart) => [...currentCart, product])
  }

  return (
    <section>
      <h1>Products</h1>

      <p>
        Products in cart: {cart.length}
      </p>

      <div>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  )
}

export default ProductsPage
