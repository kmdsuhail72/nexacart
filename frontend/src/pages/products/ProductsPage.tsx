import { useMemo, useState } from 'react'
import ProductCard from '../../components/product/ProductCard'
import { products } from '../../data/products'
import { useCart } from '../../hooks/useCart'

function ProductsPage() {
  const { addToCart } = useCart()

  const [category, setCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = useMemo(
    () => ['All', ...new Set(products.map((product) => product.category))],
    [],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        category === 'All' || product.category === category

      const matchesSearch =
        normalizedSearch === '' ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.description.toLowerCase().includes(normalizedSearch) ||
        product.category.toLowerCase().includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [category, searchTerm])

  return (
    <section>
      <div>
        <h1>Shop Products</h1>
        <p>Discover products available on NexaCart.</p>
      </div>

      <div>
        <label htmlFor="product-search">
          Search products
        </label>

        <input
          id="product-search"
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
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

      <p>
        Showing {filteredProducts.length} product
        {filteredProducts.length === 1 ? '' : 's'}
      </p>

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
        <div>
          <h2>No products found</h2>
          <p>
            Try a different search term or category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearchTerm('')
              setCategory('All')
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  )
}

export default ProductsPage
