import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

function Header() {
  const { cartCount } = useCart()

  return (
    <header>
      <div>
        <Link to="/" aria-label="NexaCart home">
          NexaCart
        </Link>
      </div>

      <nav aria-label="Primary navigation">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          Cart ({cartCount})
        </Link>
        <Link to="/account">Account</Link>
      </nav>
    </header>
  )
}

export default Header
