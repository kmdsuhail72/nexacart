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
        products.map(
          (product) => product.category,
        ),
      ),
    ],
    [],
  )

  const filteredProducts =
    category === 'All'
      ? products
      : products.filter(
          (product) =>
            product.category === category,
        )

  return (
    <section className="products-page">
      <div className="products-header">
        <div>
          <span className="section-eyebrow">
            NexaCart Collection
          </span>

          <h1>Shop Products</h1>

          <p>
            Discover quality products selected
            for your everyday needs.
          </p>
        </div>

        <div className="products-count">
          <strong>
            {filteredProducts.length}
          </strong>

          <span>
            {filteredProducts.length === 1
              ? 'product'
              : 'products'}
          </span>
        </div>
      </div>

      <div className="products-toolbar">
        <div
          className="category-filter"
          role="group"
          aria-label="Product categories"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={
                category === item
                  ? 'category-filter-active'
                  : ''
              }
              onClick={() =>
                setCategory(item)
              }
              aria-pressed={
                category === item
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>

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
          <span className="products-empty-icon">
            —
          </span>

          <h2>No products found</h2>

          <p>
            There are currently no products in
            this category.
          </p>

          <button
            type="button"
            className="button button-secondary"
            onClick={() =>
              setCategory('All')
            }
          >
            View All Products
          </button>
        </div>
      )}

      <div className="products-footer-link">
        <Link
          to="/cart"
          className="text-link"
        >
          View your cart →
        </Link>
      </div>
    </section>
  )
}

export default ProductsPage
