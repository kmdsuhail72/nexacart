import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import Button from '../ui/Button'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const isOutOfStock = product.stock === 0

  return (
    <article className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-card-visual"
        aria-label={`View ${product.name}`}
      >
        <span className="product-card-category">
          {product.category}
        </span>

        <div className="product-card-placeholder">
          {product.name
            .charAt(0)
            .toUpperCase()}
        </div>
      </Link>

      <div className="product-card-content">
        <div>
          <h2>
            <Link
              to={`/products/${product.id}`}
            >
              {product.name}
            </Link>
          </h2>

          <p className="product-card-description">
            {product.description}
          </p>
        </div>

        <div className="product-card-meta">
          <strong className="product-card-price">
            {product.currency}{' '}
            {product.price.toLocaleString('en-IN')}
          </strong>

          <span
            className={
              isOutOfStock
                ? 'stock-label stock-label-out'
                : 'stock-label'
            }
          >
            {isOutOfStock
              ? 'Out of stock'
              : `${product.stock} available`}
          </span>
        </div>

        <div className="product-card-actions">
          <Link
            to={`/products/${product.id}`}
            className="button button-secondary"
          >
            View Details
          </Link>

          <Button
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
          >
            {isOutOfStock
              ? 'Out of Stock'
              : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
