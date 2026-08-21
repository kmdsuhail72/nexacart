import { Link } from 'react-router-dom'
import ProductCard from '../../components/product/ProductCard'
import { products } from '../../data/products'
import { useCart } from '../../hooks/useCart'

function HomePage() {
  const { addToCart } = useCart()

  const featuredProducts = products.slice(0, 3)

  const categories = [
    {
      name: 'Electronics',
      description: 'Smart devices and everyday technology.',
    },
    {
      name: 'Fashion',
      description: 'Comfortable products for your everyday style.',
    },
  ]

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-eyebrow">
            Welcome to NexaCart
          </span>

          <h1>
            Everything you need.
            <br />
            All in one place.
          </h1>

          <p>
            Discover quality products, simple shopping,
            and a seamless checkout experience.
          </p>

          <div className="hero-actions">
            <Link
              to="/products"
              className="button"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="button button-secondary"
            >
              Explore Products
            </Link>
          </div>
        </div>

        <div
          className="hero-visual"
          aria-hidden="true"
        >
          <div className="hero-card">
            <span>Featured</span>
            <strong>NexaCart</strong>
            <p>Modern shopping made simple.</p>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <span className="section-eyebrow">
            Shop by category
          </span>

          <h2>
            Find what you need
          </h2>

          <p>
            Explore our growing selection of products
            across popular categories.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.name}
              to="/products"
              className="category-card"
            >
              <span className="category-icon">
                {category.name === 'Electronics'
                  ? '⚡'
                  : '◈'}
              </span>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <span className="category-link">
                Browse products →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header section-header-row">
          <div>
            <span className="section-eyebrow">
              Featured products
            </span>

            <h2>
              Popular picks
            </h2>

            <p>
              Some of our most popular products,
              selected for you.
            </p>
          </div>

          <Link
            to="/products"
            className="text-link"
          >
            View all products →
          </Link>
        </div>

        <div className="product-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="section-header">
          <span className="section-eyebrow">
            Why NexaCart?
          </span>

          <h2>
            Shopping made simple
          </h2>
        </div>

        <div className="benefits-grid">
          <article className="benefit-card">
            <span className="benefit-icon">
              ✓
            </span>

            <h3>
              Quality Products
            </h3>

            <p>
              Carefully selected products for
              your everyday needs.
            </p>
          </article>

          <article className="benefit-card">
            <span className="benefit-icon">
              ⚡
            </span>

            <h3>
              Simple Shopping
            </h3>

            <p>
              Find products quickly with a
              straightforward experience.
            </p>
          </article>

          <article className="benefit-card">
            <span className="benefit-icon">
              🔒
            </span>

            <h3>
              Secure Checkout
            </h3>

            <p>
              A clean and reliable checkout
              experience from cart to order.
            </p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default HomePage
