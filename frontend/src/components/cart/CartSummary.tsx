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
      <div className="cart-summary-header">
        <span className="section-eyebrow">
          Summary
        </span>

        <h2>Order Summary</h2>
      </div>

      <div className="cart-summary-row">
        <span>Items</span>

        <strong>
          {cartCount}
        </strong>
      </div>

      <div className="cart-summary-row">
        <span>Subtotal</span>

        <strong>
          INR{' '}
          {cartTotal.toLocaleString(
            'en-IN',
          )}
        </strong>
      </div>

      <div className="cart-summary-row">
        <span>Delivery</span>

        <strong className="cart-free">
          FREE
        </strong>
      </div>

      <div className="cart-summary-total">
        <span>Total</span>

        <strong>
          INR{' '}
          {cartTotal.toLocaleString(
            'en-IN',
          )}
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
        disabled={cartCount === 0}
      >
        Clear Cart
      </Button>

      <p className="cart-summary-note">
        Taxes and delivery charges are calculated
        at checkout where applicable.
      </p>
    </aside>
  )
}

export default CartSummary
