import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import { useCart } from '../../hooks/useCart'

function CartSummary() {
  const {
    cartCount,
    cartTotal,
    clearCart,
  } = useCart()

  return (
    <aside className="cart-summary">
      <div>
        <span className="section-eyebrow">
          Summary
        </span>

        <h2>
          Order Summary
        </h2>
      </div>

      <div className="cart-summary-row">
        <span>
          Items
        </span>

        <strong>
          {cartCount}
        </strong>
      </div>

      <div className="cart-summary-row">
        <span>
          Subtotal
        </span>

        <strong>
          INR {cartTotal.toLocaleString('en-IN')}
        </strong>
      </div>

      <div className="cart-summary-row">
        <span>
          Delivery
        </span>

        <strong className="cart-free">
          FREE
        </strong>
      </div>

      <div className="cart-summary-total">
        <span>
          Total
        </span>

        <strong>
          INR {cartTotal.toLocaleString('en-IN')}
        </strong>
      </div>

      <Link
        to="/checkout"
        className="button cart-checkout-button"
      >
        Proceed to Checkout
      </Link>

      <Button
        variant="secondary"
        onClick={clearCart}
      >
        Clear Cart
      </Button>
    </aside>
  )
}

export default CartSummary
