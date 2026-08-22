import { Link } from 'react-router-dom'
import { products } from '../../data/products'

function HomePage() {
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-content">
          <span className="section-eyebrow">
            Welcome to NexaCart
          </span>

          <h1>
            Everything you need,
            <span> delivered simply.</span>
          </h1>

          <p>
            Discover quality products, simple
            shopping, and a seamless checkout
            experience designed around you.
          </p>

          <div className="home-hero-actions">
            <Link
              to="/products"
              className="button button-primary"
            >
              Shop Products
            </Link>

            <Link
              to="/account"
              className="button button-secondary"
            >
              View Account
            </Link>
          </div>
        </div>

        <div
          className="home-hero-visual"
          aria-hidden="true"
        >
          <div className="home-hero-card">
            <span>Featured</span>

            <strong>NexaCart</strong>

            <p>
              Modern shopping.
              <br />
              Simple checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="home-benefits">
        <div>
          <span className="home-benefit-icon">
            ✓
          </span>

          <div>
            <strong>Quality Products</strong>

            <p>
              Carefully selected products for
              everyday needs.
            </p>
          </div>
        </div>

        <div>
          <span className="home-benefit-icon">
            →
          </span>

          <div>
            <strong>Simple Shopping</strong>

            <p>
              Browse, add to cart, and checkout
              without unnecessary steps.
            </p>
          </div>
        </div>

        <div>
          <span className="home-benefit-icon">
            🔒
          </span>

          <div>
            <strong>Secure Checkout</strong>

            <p>
              A straightforward checkout flow
              designed for confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="home-products">
        <div className="home-section-header">
          <div>
            <span className="section-eyebrow">
              Featured Collection
            </span>

            <h2>
              Popular products
            </h2>

            <p>
              Explore some of the products
              available on NexaCart.
            </p>
          </div>

          <Link
            to="/products"
            className="text-link"
          >
            View all products →
          </Link>
        </div>

        <div className="home-product-grid">
          {featuredProducts.map((product) => (
            <article
              key={product.id}
              className="home-product-card"
            >
              <div className="home-product-image">
                <span>
                  {product.category}
                </span>
              </div>

              <div className="home-product-content">
                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <p>
                  {product.description}
                </p>

                <div className="home-product-footer">
                  <strong>
                    {product.currency}{' '}
                    {product.price.toLocaleString(
                      'en-IN',
                    )}
                  </strong>

                  <Link
                    to={`/products/${product.id}`}
                    className="text-link"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div>
          <span className="section-eyebrow">
            Ready to shop?
          </span>

          <h2>
            Find something you'll love.
          </h2>

          <p>
            Browse the complete NexaCart
            collection and start shopping today.
          </p>
        </div>

        <Link
          to="/products"
          className="button button-primary"
        >
          Explore Products
        </Link>
      </section>
    </div>
  )
}

export default HomePage
