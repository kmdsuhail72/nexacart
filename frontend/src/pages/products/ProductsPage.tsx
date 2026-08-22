import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/product/ProductCard'
import { products } from '../../data/products'
import { useCart } from '../../hooks/useCart'

function ProductsPage() {
  const { addToCart } = useCart()
  const [category, setCategory] = useState('All')

  const categories = useMemo(
    () => [
      'All',
      ...new Set(
        products.map((product) => product.category),
      ),
    ],
    [],
  )

  const filteredProducts =
    category === 'All'
      ? products
      : products.filter(
          (product) => product.category === category,
        )

  return (
    <section className="products-page">
      <div className="products-header">
        <div>
          <span className="section-eyebrow">
            NexaCart Store
          </span>

          <h1>Shop Products</h1>

          <p>
            Discover quality products selected for
            your everyday needs.
          </p>
        </div>

        <Link
          to="/cart"
          className="button button-secondary"
        >
          View Cart
        </Link>
      </div>

      <div className="catalog-toolbar">
        <div>
          <strong>
            {filteredProducts.length}
          </strong>{' '}
          {filteredProducts.length === 1
            ? 'product'
            : 'products'}
        </div>

        <nav
          className="category-filter"
          aria-label="Product categories"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? 'category-filter-button active'
                  : 'category-filter-button'
              }
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
            >
              {item}
            </button>
          ))}
        </nav>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>

          <p>
            There are currently no products in this
            category.
          </p>

          <button
            type="button"
            className="button"
            onClick={() => setCategory('All')}
          >
            View All Products
          </button>
        </div>
      )}
    </section>
  )
}

export default ProductsPage
