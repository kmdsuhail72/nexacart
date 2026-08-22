import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

function Header() {
  const { cartCount } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          to="/"
          className="site-logo"
          aria-label="NexaCart home"
          onClick={closeMenu}
        >
          <span className="site-logo-mark">N</span>

          <span className="site-logo-text">
            NexaCart
          </span>
        </Link>

        <nav
          className={`site-nav ${
            isMenuOpen ? 'site-nav-open' : ''
          }`}
          aria-label="Primary navigation"
        >
          <NavLink
            to="/"
            end
            onClick={closeMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            onClick={closeMenu}
          >
            Products
          </NavLink>

          <NavLink
            to="/account"
            onClick={closeMenu}
          >
            Account
          </NavLink>

          <NavLink
            to="/cart"
            className="site-nav-cart"
            onClick={closeMenu}
          >
            <span>Cart</span>

            {cartCount > 0 && (
              <span
                className="cart-count"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount}
              </span>
            )}
          </NavLink>
        </nav>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={
            isMenuOpen
              ? 'Close navigation menu'
              : 'Open navigation menu'
          }
          aria-expanded={isMenuOpen}
          onClick={() =>
            setIsMenuOpen((current) => !current)
          }
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

export default Header
