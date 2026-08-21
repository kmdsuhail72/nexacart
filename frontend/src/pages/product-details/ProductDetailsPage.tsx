import { Link, useParams } from 'react-router-dom'
import { products } from '../../data/products'
import { useCart } from '../../hooks/useCart'
import Button from '../../components/ui/Button'

function ProductDetailsPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()

  const product = products.find((item) => item.id === productId)

  if (!product) {
    return (
      <section>
        <h1>Product not found</h1>
        <p>The product you are looking for does not exist.</p>
        <Link to="/products">Back to Products</Link>
      </section>
    )
  }

  const isOutOfStock = product.stock === 0

  return (
    <section>
      <Link to="/products">← Back to Products</Link>

      <article>
        <span>{product.category}</span>

        <h1>{product.name}</h1>

        <p>{product.description}</p>

        <p>
          {product.currency} {product.price.toLocaleString('en-IN')}
        </p>

        <p>
          {isOutOfStock
            ? 'Out of stock'
            : `${product.stock} items available`}
        </p>

        <Button
          disabled={isOutOfStock}
          onClick={() => addToCart(product)}
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </article>
    </section>
  )
}

export default ProductDetailsPage
