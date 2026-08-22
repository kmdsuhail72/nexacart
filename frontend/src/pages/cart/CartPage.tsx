import { Link } from 'react-router-dom'
import CartItem from '../../components/cart/CartItem'
import CartSummary from '../../components/cart/CartSummary'
import { useCart } from '../../hooks/useCart'

function CartPage() {
  const { items, cartCount } = useCart()

  if (items.length === 0) {
    return (
      <section className="cart-empty">
        <span className="section-eyebrow">
          Shopping Cart
        </span>

        <div className="cart-empty-icon">
          🛒
        </div>

        <h1>Your cart is empty</h1>

        <p>
          Looks like you haven't added anything
          to your cart yet.
        </p>

        <Link
          to="/products"
          className="button"
        >
          Start Shopping
        </Link>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <div className="cart-header">
        <div>
          <span className="section-eyebrow">
            Shopping Cart
          </span>

          <h1>Your Cart</h1>

          <p>
            Review your items before continuing
            to checkout.
          </p>
        </div>

        <span className="cart-count">
          {cartCount}{' '}
          {cartCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <CartItem
              key={item.product.id}
              item={item}
            />
          ))}

          <Link
            to="/products"
            className="cart-continue"
          >
            ← Continue Shopping
          </Link>
        </div>

        <CartSummary />
      </div>
    </section>
  )
}

export default CartPage
