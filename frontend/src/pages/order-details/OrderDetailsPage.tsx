import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'

function OrderDetailsPage() {
  const { orderId } = useParams()

  const order = orderId
    ? getOrderById(orderId)
    : undefined

  if (!order) {
    return (
      <section className="order-details-not-found">
        <span className="section-eyebrow">
          Order Details
        </span>

        <div className="order-not-found-card">
          <div className="order-not-found-icon">
            ?
          </div>

          <h1>Order Not Found</h1>

          <p>
            We could not find the order you are
            looking for. It may no longer exist
            in this browser.
          </p>

          <Link
            to="/account"
            className="button"
          >
            Back to My Orders
          </Link>
        </div>
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
          <div>
            <span className="section-eyebrow">
              Order Details
            </span>

            <h1>{order.id}</h1>

            <p>
              Placed on{' '}
              {new Date(
                order.createdAt,
              ).toLocaleString('en-IN')}
            </p>
          </div>

          <span className="order-status">
            {order.status}
          </span>
        </div>
      </div>

      <div className="order-details-layout">
        <main className="order-details-main">
          <section className="order-details-card">
            <div className="order-card-heading">
              <div>
                <span className="section-eyebrow">
                  Your Purchase
                </span>

                <h2>Items Ordered</h2>
              </div>

              <span>
                {order.totalItems}{' '}
                {order.totalItems === 1
                  ? 'item'
                  : 'items'}
              </span>
            </div>

            <div className="order-detail-items">
              {order.items.map((item) => (
                <article
                  key={item.product.id}
                  className="order-detail-item"
                >
                  <div className="order-detail-product">
                    <div className="order-detail-product-icon">
                      {item.product.name
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <div>
                      <h3>
                        {item.product.name}
                      </h3>

                      <span>
                        {item.product.category}
                      </span>
                    </div>
                  </div>

                  <div className="order-detail-quantity">
                    <span>Qty</span>
                    <strong>
                      {item.quantity}
                    </strong>
                  </div>

                  <div className="order-detail-price">
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
          </section>

          <section className="order-details-card">
            <div className="order-card-heading">
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

          <section className="order-details-card">
            <div className="order-card-heading">
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
            </div>
          </section>
        </main>

        <aside className="order-details-sidebar">
          <div className="order-details-card order-summary-card">
            <span className="section-eyebrow">
              Summary
            </span>

            <h2>Order Total</h2>

            <div className="order-summary-lines">
              <div>
                <span>Items</span>
                <strong>
                  {order.totalItems}
                </strong>
              </div>

              <div>
                <span>Subtotal</span>

                <strong>
                  INR{' '}
                  {order.totalAmount.toLocaleString(
                    'en-IN',
                  )}
                </strong>
              </div>

              <div>
                <span>Delivery</span>

                <strong className="order-free">
                  FREE
                </strong>
              </div>
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

            <Link
              to="/products"
              className="button order-shop-button"
            >
              Continue Shopping
            </Link>

            <Link
              to="/account"
              className="button button-secondary order-account-button"
            >
              View All Orders
            </Link>
          </div>

          <div className="order-status-card">
            <div className="order-status-dot">
              ✓
            </div>

            <div>
              <strong>
                Order {order.status.toLowerCase()}
              </strong>

              <p>
                Your order has been successfully
                recorded by NexaCart.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default OrderDetailsPage
