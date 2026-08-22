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
        className="product-card-image"
        aria-label={`View ${product.name}`}
      >
        <span className="product-card-category">
          {product.category}
        </span>

        <span className="product-card-placeholder">
          {product.name.charAt(0)}
        </span>
      </Link>

      <div className="product-card-content">
        <span className="product-card-eyebrow">
          {product.category}
        </span>

        <Link
          to={`/products/${product.id}`}
          className="product-card-title"
        >
          {product.name}
        </Link>

        <p className="product-card-description">
          {product.description}
        </p>

        <div className="product-card-meta">
          <strong className="product-card-price">
            {product.currency}{' '}
            {product.price.toLocaleString(
              'en-IN',
            )}
          </strong>

          <span
            className={
              isOutOfStock
                ? 'product-stock product-stock-empty'
                : 'product-stock'
            }
          >
            {isOutOfStock
              ? 'Out of stock'
              : `${product.stock} available`}
          </span>
        </div>

        <div className="product-card-actions">
          <Button
            disabled={isOutOfStock}
            onClick={() =>
              onAddToCart(product)
            }
          >
            {isOutOfStock
              ? 'Out of Stock'
              : 'Add to Cart'}
          </Button>

          <Link
            to={`/products/${product.id}`}
            className="product-view-link"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
