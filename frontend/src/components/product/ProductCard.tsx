import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import Button from '../ui/Button'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isOutOfStock = product.stock === 0

  return (
    <article>
      <div>
        <span>{product.category}</span>

        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <p>
          {product.currency} {product.price.toLocaleString('en-IN')}
        </p>

        <p>
          {isOutOfStock
            ? 'Out of stock'
            : `${product.stock} items available`}
        </p>

        <div>
          <Link to={`/products/${product.id}`}>
            View Details
          </Link>

          <Button
            disabled={isOutOfStock}
            onClick={() => onAddToCart(product)}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
