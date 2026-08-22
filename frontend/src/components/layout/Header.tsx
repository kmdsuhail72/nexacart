import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

function Header() {
  const { cartCount } = useCart()

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link
          to="/"
          className="site-logo"
          aria-label="NexaCart home"
        >
          <span className="site-logo-mark">N</span>

          <span className="site-logo-text">
            NexaCart
          </span>
        </Link>

        <nav
          className="site-nav"
          aria-label="Primary navigation"
        >
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Cart
            {cartCount > 0 && (
              <span className="nav-cart-count">
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? 'active' : ''
            }
          >
            Account
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

export default Header
