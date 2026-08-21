import { useMemo, useState } from 'react'
import ProductCard from '../../components/product/ProductCard'
import { products } from '../../data/products'
import { useCart } from '../../hooks/useCart'

function ProductsPage() {
  const { addToCart } = useCart()
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [],
  )

  const filteredProducts =
    category === 'All'
      ? products
      : products.filter((product) => product.category === category)

  return (
    <section>
      <div>
        <h1>Shop Products</h1>
        <p>Discover products available on NexaCart.</p>
      </div>

      <nav aria-label="Product categories">
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </nav>

      <div>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p>No products found in this category.</p>
      )}
    </section>
  )
}

export default ProductsPage
