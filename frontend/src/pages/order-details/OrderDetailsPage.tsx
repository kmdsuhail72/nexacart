import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'

function OrderDetailsPage() {
  const { orderId } = useParams()

  const order = orderId
    ? getOrderById(orderId)
    : undefined

  if (!order) {
    return (
      <section className="order-details-page">
        <div className="order-details-not-found">
          <span className="section-eyebrow">
            Order
          </span>

          <h1>Order Not Found</h1>

          <p>
            We could not find the order you are
            looking for.
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

  const orderDate = new Date(
    order.createdAt,
  ).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

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
              Placed on {orderDate}
            </p>
          </div>

          <span
            className={`order-status order-status-${order.status.toLowerCase()}`}
          >
            <span className="order-status-dot" />

            {order.status}
          </span>
        </div>
      </div>

      <div className="order-details-layout">
        <div className="order-details-main">
          <div className="order-details-card">
            <div className="order-details-card-header">
              <div>
                <span className="section-eyebrow">
                  Customer
                </span>

                <h2>Customer Information</h2>
              </div>
            </div>

            <div className="order-details-information">
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
          </div>

          <div className="order-details-card">
            <div className="order-details-card-header">
              <div>
                <span className="section-eyebrow">
                  Delivery
                </span>

                <h2>Shipping Address</h2>
              </div>
            </div>

            <div className="shipping-address">
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
          </div>

          <div className="order-details-card">
            <div className="order-details-card-header">
              <div>
                <span className="section-eyebrow">
                  Purchase
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
                  className="order-details-item"
                >
                  <div className="order-item-visual">
                    {item.product.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <div className="order-item-content">
                    <h3>
                      {item.product.name}
                    </h3>

                    <p>
                      {item.product.category}
                    </p>

                    <span>
                      Qty: {item.quantity}
                    </span>
                  </div>

                  <div className="order-item-pricing">
                    <span>
                      INR{' '}
                      {item.product.price.toLocaleString(
                        'en-IN',
                      )}{' '}
                      × {item.quantity}
                    </span>

                    <strong>
                      INR{' '}
                      {(
                        item.product.price *
                        item.quantity
                      ).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="order-details-summary">
          <div className="order-summary-card">
            <span className="section-eyebrow">
              Summary
            </span>

            <h2>Order Summary</h2>

            <div className="order-summary-row">
              <span>Total Items</span>

              <strong>
                {order.totalItems}
              </strong>
            </div>

            <div className="order-summary-row">
              <span>Subtotal</span>

              <strong>
                INR{' '}
                {order.totalAmount.toLocaleString(
                  'en-IN',
                )}
              </strong>
            </div>

            <div className="order-summary-divider" />

            <div className="order-summary-total">
              <span>Total</span>

              <strong>
                INR{' '}
                {order.totalAmount.toLocaleString(
                  'en-IN',
                )}
              </strong>
            </div>

            <div className="order-summary-confirmed">
              <span className="order-status-dot" />

              <div>
                <strong>
                  Order confirmed
                </strong>

                <span>
                  Your order has been received
                  successfully.
                </span>
              </div>
            </div>
          </div>

          <Link
            to="/products"
            className="button button-secondary order-continue-button"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default OrderDetailsPage
