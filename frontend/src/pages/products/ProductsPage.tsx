import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/product/ProductCard'
import { products } from '../../data/products'
import { useCart } from '../../hooks/useCart'

function ProductsPage() {
  const { addToCart } = useCart()

  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const categories = useMemo(
    () => [
      'All',
      ...new Set(
        products.map((product) => product.category),
      ),
    ],
    [],
  )

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase()

    return products.filter((product) => {
      const matchesCategory =
        category === 'All' ||
        product.category === category

      const matchesSearch =
        normalizedSearch === '' ||
        product.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        product.description
          .toLowerCase()
          .includes(normalizedSearch)

      return matchesCategory && matchesSearch
    })
  }, [category, search])

  return (
    <section className="products-page">
      <div className="products-header">
        <div>
          <span className="section-eyebrow">
            NexaCart Store
          </span>

          <h1>Shop Products</h1>

          <p>
            Discover carefully selected products
            for everyday life.
          </p>
        </div>

        <Link
          to="/cart"
          className="button button-secondary"
        >
          View Cart
        </Link>
      </div>

      <div className="products-toolbar">
        <label className="products-search">
          <span className="sr-only">
            Search products
          </span>

          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </label>

        <div
          className="products-count"
          aria-live="polite"
        >
          {filteredProducts.length}{' '}
          {filteredProducts.length === 1
            ? 'product'
            : 'products'}
        </div>
      </div>

      <nav
        className="product-categories"
        aria-label="Product categories"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            className={
              category === item
                ? 'category-button category-button-active'
                : 'category-button'
            }
            onClick={() => setCategory(item)}
            aria-pressed={category === item}
          >
            {item}
          </button>
        ))}
      </nav>

      {filteredProducts.length > 0 ? (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className="products-empty">
          <div className="products-empty-icon">
            ×
          </div>

          <h2>No products found</h2>

          <p>
            Try a different search term or category.
          </p>

          <button
            type="button"
            className="button"
            onClick={() => {
              setSearch('')
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
