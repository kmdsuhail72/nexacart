import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

function Header() {
  const { cartCount } = useCart()

  return (
    <header className="site-header">
      <div className="header-container">
        <Link
          to="/"
          className="brand"
          aria-label="NexaCart home"
        >
          <span className="brand-mark">N</span>
          <span className="brand-name">NexaCart</span>
        </Link>

        <nav
          className="main-nav"
          aria-label="Primary navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `nav-link cart-link ${isActive ? 'active' : ''}`
            }
          >
            Cart
            <span className="cart-badge">
              {cartCount}
            </span>
          </NavLink>

          <NavLink
            to="/account"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active' : ''}`
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
