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
        className="product-image"
        aria-label={`View ${product.name}`}
      >
        <div className="product-image-placeholder">
          <span>
            {product.category === 'Electronics'
              ? '⚡'
              : '◈'}
          </span>
        </div>
      </Link>

      <div className="product-card-content">
        <div className="product-card-top">
          <span className="product-category">
            {product.category}
          </span>

          {isOutOfStock && (
            <span className="stock-badge out">
              Out of stock
            </span>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="product-name"
        >
          <h2>{product.name}</h2>
        </Link>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-card-bottom">
          <div>
            <span className="product-price">
              {product.currency}{' '}
              {product.price.toLocaleString('en-IN')}
            </span>

            <span
              className={
                isOutOfStock
                  ? 'stock-text out'
                  : 'stock-text'
              }
            >
              {isOutOfStock
                ? 'Currently unavailable'
                : `${product.stock} available`}
            </span>
          </div>

          <Button
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
          >
            {isOutOfStock
              ? 'Unavailable'
              : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
