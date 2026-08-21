import type { Product } from '../../types/product'
import Button from '../ui/Button'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article>
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          {product.currency} {product.price.toLocaleString('en-IN')}
        </p>
        <p>Category: {product.category}</p>
        <p>Stock: {product.stock}</p>

        <Button
          disabled={product.stock === 0}
          onClick={() => onAddToCart(product)}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </article>
  )
}

export default ProductCard
