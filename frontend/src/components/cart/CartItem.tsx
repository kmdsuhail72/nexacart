import type { CartItem as CartItemType } from '../../context/CartContext'
import Button from '../ui/Button'
import { useCart } from '../../hooks/useCart'

interface CartItemProps {
  item: CartItemType
}

function CartItem({ item }: CartItemProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const { product, quantity } = item

  const itemTotal =
    product.price * quantity

  return (
    <article className="cart-item">
      <div className="cart-item-visual">
        <span>
          {product.name.charAt(0)}
        </span>
      </div>

      <div className="cart-item-content">
        <div className="cart-item-main">
          <div>
            <span className="cart-item-category">
              {product.category}
            </span>

            <h2>{product.name}</h2>

            <p>
              {product.description}
            </p>
          </div>

          <strong className="cart-item-price">
            {product.currency}{' '}
            {product.price.toLocaleString(
              'en-IN',
            )}
          </strong>
        </div>

        <div className="cart-item-footer">
          <div className="cart-quantity">
            <button
              type="button"
              onClick={() =>
                decreaseQuantity(product.id)
              }
              disabled={quantity <= 1}
              aria-label={`Decrease ${product.name} quantity`}
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              type="button"
              onClick={() =>
                increaseQuantity(product.id)
              }
              aria-label={`Increase ${product.name} quantity`}
            >
              +
            </button>
          </div>

          <div className="cart-item-actions">
            <strong>
              INR{' '}
              {itemTotal.toLocaleString(
                'en-IN',
              )}
            </strong>

            <Button
              variant="secondary"
              onClick={() =>
                removeFromCart(product.id)
              }
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default CartItem
