import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { products } from '../../data/products'
import { useCart } from '../../hooks/useCart'

function ProductDetailsPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const product = products.find(
    (item) => item.id === productId,
  )

  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <section className="product-not-found">
        <span className="section-eyebrow">
          NexaCart
        </span>

        <h1>Product Not Found</h1>

        <p>
          The product you are looking for does not
          exist or is no longer available.
        </p>

        <Link
          to="/products"
          className="button"
        >
          Back to Products
        </Link>
      </section>
    )
  }

  const isOutOfStock = product.stock === 0
  const maxQuantity = Math.max(product.stock, 1)

  function handleQuantityChange(
    nextQuantity: number,
  ) {
    setQuantity(
      Math.min(
        Math.max(nextQuantity, 1),
        maxQuantity,
      ),
    )
  }

 function handleAddToCart() {
  if (!product || isOutOfStock) {
    return
  }

  for (let index = 0; index < quantity; index += 1) {
    addToCart(product)
  }
}

  function handleBuyNow() {
    if (isOutOfStock) {
      return
    }

    handleAddToCart()
    navigate('/cart')
  }

  return (
    <section className="product-details-page">
      <Link
        to="/products"
        className="back-link"
      >
        ← Back to Products
      </Link>

      <div className="product-details">
        <div className="product-details-visual">
          <div className="product-details-image">
            <span>
              {product.category === 'Electronics'
                ? '⚡'
                : '◈'}
            </span>
          </div>
        </div>

        <div className="product-details-content">
          <span className="product-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-details-price">
            {product.currency}{' '}
            {product.price.toLocaleString('en-IN')}
          </div>

          <div
            className={
              isOutOfStock
                ? 'product-availability out'
                : 'product-availability'
            }
          >
            <span className="availability-dot" />

            {isOutOfStock
              ? 'Currently out of stock'
              : `${product.stock} items available`}
          </div>

          {!isOutOfStock && (
            <div className="quantity-control">
              <span>Quantity</span>

              <div className="quantity-selector">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    handleQuantityChange(quantity - 1)
                  }
                  disabled={quantity <= 1}
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    handleQuantityChange(quantity + 1)
                  }
                  disabled={
                    quantity >= product.stock
                  }
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="product-details-actions">
            <Button
              disabled={isOutOfStock}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Button
              disabled={isOutOfStock}
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          <div className="product-benefits">
            <div>
              <strong>Secure Shopping</strong>
              <span>Safe and reliable checkout</span>
            </div>

            <div>
              <strong>Quality Products</strong>
              <span>Carefully selected products</span>
            </div>

            <div>
              <strong>Easy Returns</strong>
              <span>Simple customer experience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsPage
