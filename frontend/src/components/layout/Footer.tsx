import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <Link
            to="/"
            className="site-footer-logo"
            aria-label="NexaCart home"
          >
            <span className="site-logo-mark">
              N
            </span>

            <span>NexaCart</span>
          </Link>

          <p>
            A modern shopping experience built
            for simplicity, speed, and trust.
          </p>
        </div>

        <div className="site-footer-column">
          <h2>Shop</h2>

          <Link to="/products">
            Products
          </Link>

          <Link to="/cart">
            Cart
          </Link>
        </div>

        <div className="site-footer-column">
          <h2>Account</h2>

          <Link to="/account">
            My Account
          </Link>

          <Link to="/account">
            Order History
          </Link>
        </div>

        <div className="site-footer-column">
          <h2>Support</h2>

          <span>Secure Checkout</span>
          <span>Reliable Delivery</span>
          <span>Customer Support</span>
        </div>
      </div>

      <div className="site-footer-bottom">
        <p>
          © 2026 NexaCart. All rights reserved.
        </p>

        <p>
          Built with React + TypeScript
        </p>
      </div>
    </footer>
  )
}

export default Footer
