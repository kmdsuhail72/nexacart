import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'

function OrderDetailsPage() {
  const { orderId } = useParams()

  const order = orderId
    ? getOrderById(orderId)
    : undefined

  if (!order) {
    return (
      <section className="order-result order-result-error">
        <div className="order-result-icon">
          !
        </div>

        <span className="section-eyebrow">
          Order Details
        </span>

        <h1>Order Not Found</h1>

        <p>
          We could not find the requested order.
        </p>

        <Link
          to="/account"
          className="button"
        >
          Back to My Account
        </Link>
      </section>
    )
  }

  return (
    <section className="order-details-page">
      <div className="order-details-header">
        <Link
          to="/account"
          className="back-link"
        >
          ← Back to My Orders
        </Link>

        <div className="order-details-heading">
          <span className="section-eyebrow">
            Order Details
          </span>

          <h1>Your Order</h1>

          <p>
            Order <strong>{order.id}</strong>
          </p>
        </div>

        <div className="order-details-status">
          <span>Status</span>

          <strong>{order.status}</strong>
        </div>
      </div>

      <div className="order-details-layout">
        <main className="order-details-main">
          <section className="order-card">
            <div className="order-card-header">
              <div>
                <span className="section-eyebrow">
                  Items
                </span>

                <h2>Order Items</h2>
              </div>

              <span className="order-item-count">
                {order.totalItems}{' '}
                {order.totalItems === 1
                  ? 'item'
                  : 'items'}
              </span>
            </div>

            <div className="order-items-list">
              {order.items.map((item) => (
                <article
                  key={item.product.id}
                  className="order-item"
                >
                  <div className="order-item-image">
                    {item.product.name.charAt(0)}
                  </div>

                  <div className="order-item-content">
                    <strong>
                      {item.product.name}
                    </strong>

                    <span>
                      {item.product.category}
                    </span>

                    <small>
                      Qty: {item.quantity}
                    </small>
                  </div>

                  <div className="order-item-pricing">
                    <span>
                      INR{' '}
                      {item.product.price.toLocaleString(
                        'en-IN',
                      )}{' '}
                      each
                    </span>

                    <strong>
                      INR{' '}
                      {(
                        item.product.price *
                        item.quantity
                      ).toLocaleString(
                        'en-IN',
                      )}
                    </strong>
                  </div>
                </article>
              ))}
            </div>

            <div className="order-total-row">
              <span>Order Total</span>

              <strong>
                INR{' '}
                {order.totalAmount.toLocaleString(
                  'en-IN',
                )}
              </strong>
            </div>
          </section>

          <section className="order-card">
            <div className="order-card-header">
              <div>
                <span className="section-eyebrow">
                  Delivery
                </span>

                <h2>Shipping Address</h2>
              </div>
            </div>

            <div className="order-address">
              <strong>
                {order.customer.firstName}{' '}
                {order.customer.lastName}
              </strong>

              <p>
                {order.shipping.addressLine1}
              </p>

              {order.shipping.addressLine2 && (
                <p>
                  {order.shipping.addressLine2}
                </p>
              )}

              <p>
                {order.shipping.city},{' '}
                {order.shipping.state}{' '}
                {order.shipping.postalCode}
              </p>

              <p>
                {order.shipping.country}
              </p>
            </div>
          </section>

          <section className="order-card">
            <div className="order-card-header">
              <div>
                <span className="section-eyebrow">
                  Customer
                </span>

                <h2>Contact Information</h2>
              </div>
            </div>

            <div className="order-contact-grid">
              <div>
                <span>Name</span>

                <strong>
                  {order.customer.firstName}{' '}
                  {order.customer.lastName}
                </strong>
              </div>

              <div>
                <span>Email</span>

                <strong>
                  {order.customer.email}
                </strong>
              </div>

              <div>
                <span>Phone</span>

                <strong>
                  {order.customer.phone}
                </strong>
              </div>

              <div>
                <span>Order Date</span>

                <strong>
                  {new Date(
                    order.createdAt,
                  ).toLocaleString('en-IN')}
                </strong>
              </div>
            </div>
          </section>
        </main>

        <aside className="order-details-sidebar">
          <div className="order-summary-card">
            <span className="section-eyebrow">
              Summary
            </span>

            <h2>Order Summary</h2>

            <div className="order-summary-row">
              <span>Items</span>

              <strong>
                {order.totalItems}
              </strong>
            </div>

            <div className="order-summary-row">
              <span>Delivery</span>

              <strong className="order-free">
                FREE
              </strong>
            </div>

            <div className="order-summary-total">
              <span>Total</span>

              <strong>
                INR{' '}
                {order.totalAmount.toLocaleString(
                  'en-IN',
                )}
              </strong>
            </div>

            <div className="order-summary-status">
              <span>✓</span>

              <div>
                <strong>Order confirmed</strong>

                <p>
                  Your order has been successfully
                  placed.
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/products"
            className="button order-shop-button"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default OrderDetailsPage
