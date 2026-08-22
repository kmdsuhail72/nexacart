import type {
  CartItem as CartItemType,
} from '../../context/CartContext'
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
          <span className="cart-item-category">
            {product.category}
          </span>

          <h2>
            {product.name}
          </h2>

          <p>
            {product.description}
          </p>

          <strong className="cart-item-price">
            {product.currency}{' '}
            {product.price.toLocaleString('en-IN')}
          </strong>
        </div>

        <div className="cart-item-controls">
          <div
            className="quantity-control"
            aria-label={`Quantity for ${product.name}`}
          >
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() =>
                decreaseQuantity(product.id)
              }
            >
              −
            </button>

            <span>
              {quantity}
            </span>

            <button
              type="button"
              aria-label="Increase quantity"
              disabled={
                quantity >= product.stock
              }
              onClick={() =>
                increaseQuantity(product.id)
              }
            >
              +
            </button>
          </div>

          <button
            type="button"
            className="cart-remove"
            onClick={() =>
              removeFromCart(product.id)
            }
          >
            Remove
          </button>
        </div>

        <div className="cart-item-total">
          <span>Item total</span>

          <strong>
            {product.currency}{' '}
            {itemTotal.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>
    </article>
  )
}

export default CartItem
