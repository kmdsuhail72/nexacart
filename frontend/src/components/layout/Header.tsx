function Header() {
  return (
    <header>
      <div>
        <a href="/" aria-label="NexaCart home">
          NexaCart
        </a>
      </div>

      <nav aria-label="Primary navigation">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/cart">Cart</a>
        <a href="/account">Account</a>
      </nav>
    </header>
  )
}

export default Header
