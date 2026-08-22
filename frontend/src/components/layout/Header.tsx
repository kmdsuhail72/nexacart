import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../../hooks/useCart'

function Header() {
  const { cartCount } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          to="/"
          className="site-logo"
          aria-label="NexaCart home"
          onClick={closeMobileMenu}
        >
          <span className="site-logo-mark">N</span>

          <span className="site-logo-text">
            NexaCart
          </span>
        </Link>

        <nav
          className={`site-nav ${
            mobileOpen ? 'site-nav-open' : ''
          }`}
          aria-label="Primary navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? 'nav-link nav-link-active'
                : 'nav-link'
            }
            onClick={closeMobileMenu}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'nav-link nav-link-active'
                : 'nav-link'
            }
            onClick={closeMobileMenu}
          >
            Products
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive
                ? 'nav-link nav-link-active'
                : 'nav-link'
            }
            onClick={closeMobileMenu}
          >
            Account
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? 'nav-link nav-link-cart nav-link-active'
                : 'nav-link nav-link-cart'
            }
            onClick={closeMobileMenu}
          >
            <span>Cart</span>

            {cartCount > 0 && (
              <span
                className="cart-badge"
                aria-label={`${cartCount} items in cart`}
              >
                {cartCount > 99
                  ? '99+'
                  : cartCount}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="site-header-actions">
          <Link
            to="/account"
            className="header-account-link"
            aria-label="My Account"
          >
            <span className="header-account-icon">
              ♙
            </span>

            <span>Account</span>
          </Link>

          <Link
            to="/cart"
            className="header-cart-link"
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <span>Cart</span>

            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount > 99
                  ? '99+'
                  : cartCount}
              </span>
            )}
          </Link>
        </div>

        <button
          type="button"
          className="mobile-menu-button"
          aria-label={
            mobileOpen
              ? 'Close navigation'
              : 'Open navigation'
          }
          aria-expanded={mobileOpen}
          onClick={() =>
            setMobileOpen((current) => !current)
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
