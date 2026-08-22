import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { products } from '../../data/products'
import { useCart } from '../../hooks/useCart'

function ProductDetailsPage() {
  const { productId } = useParams()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const foundProduct = products.find(
    (item) => item.id === productId,
  )

  if (!foundProduct) {
    return (
      <section className="product-not-found">
        <span className="section-eyebrow">
          Product
        </span>

        <h1>Product not found</h1>

        <p>
          We could not find the product you are
          looking for.
        </p>

        <Link
          to="/products"
          className="button"
        >
          Browse Products
        </Link>
      </section>
    )
  }

  const product = foundProduct
  const isOutOfStock = product.stock === 0

  function handleAddToCart() {
    if (isOutOfStock) {
      return
    }

    for (let index = 0; index < quantity; index += 1) {
      addToCart(product)
    }
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(1, current - 1),
    )
  }

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(product.stock, current + 1),
    )
  }

  return (
    <section className="product-details-page">
      <div className="product-details-breadcrumb">
        <Link to="/products">
          Products
        </Link>

        <span>/</span>

        <span>{product.name}</span>
      </div>

      <div className="product-details">
        <div className="product-details-visual">
          <div className="product-details-image">
            <span className="product-details-category">
              {product.category}
            </span>

            <span className="product-details-image-placeholder">
              {product.name.charAt(0)}
            </span>
          </div>
        </div>

        <div className="product-details-content">
          <span className="section-eyebrow">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <p className="product-details-description">
            {product.description}
          </p>

          <div className="product-details-price">
            <strong>
              {product.currency}{' '}
              {product.price.toLocaleString(
                'en-IN',
              )}
            </strong>
          </div>

          <div className="product-details-stock">
            <span
              className={
                isOutOfStock
                  ? 'stock-dot stock-dot-empty'
                  : 'stock-dot'
              }
            />

            <span>
              {isOutOfStock
                ? 'Currently unavailable'
                : `${product.stock} items available`}
            </span>
          </div>

          {!isOutOfStock && (
            <div className="product-details-purchase">
              <div className="quantity-control">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  −
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    quantity >= product.stock
                  }
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
              >
                Add {quantity} to Cart
              </Button>
            </div>
          )}

          {isOutOfStock && (
            <Button disabled>
              Out of Stock
            </Button>
          )}

          <div className="product-benefits">
            <div>
              <strong>Secure checkout</strong>

              <span>
                Your order information is handled
                securely.
              </span>
            </div>

            <div>
              <strong>Fast delivery</strong>

              <span>
                Reliable delivery to your
                registered address.
              </span>
            </div>

            <div>
              <strong>Easy support</strong>

              <span>
                Get assistance whenever you need
                it.
              </span>
            </div>
          </div>

          <Link
            to="/cart"
            className="product-details-cart-link"
          >
            View Cart →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailsPage
