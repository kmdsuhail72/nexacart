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
    <aside>
      <h2>Cart Summary</h2>

      <p>
        Total items: {cartCount}
      </p>

      <p>
        Total: INR {cartTotal.toLocaleString('en-IN')}
      </p>

      <div>
        <Button
          onClick={clearCart}
          disabled={cartCount === 0}
        >
          Clear Cart
        </Button>

        {cartCount > 0 && (
          <Link to="/checkout">
            Proceed to Checkout
          </Link>
        )}
      </div>
    </aside>
  )
}

export default CartSummary
