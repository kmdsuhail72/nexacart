import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'

function OrderConfirmationPage() {
  const { orderId } = useParams()

  const order = orderId
    ? getOrderById(orderId)
    : undefined

  if (!order) {
    return (
      <section className="order-confirmation-page">
        <span className="section-eyebrow">
          Order
        </span>

        <div className="confirmation-card">
          <div className="confirmation-icon">
            !
          </div>

          <h1>Order Not Found</h1>

          <p>
            We could not find the order you are
            looking for.
          </p>

          <Link
            to="/account"
            className="button"
          >
            View My Orders
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="order-confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">
          ✓
        </div>

        <span className="section-eyebrow">
          Order Confirmed
        </span>

        <h1>Thank you for your order!</h1>

        <p>
          Your order has been received successfully.
          We have saved your order details for future
          reference.
        </p>

        <div className="confirmation-order">
          <span>Order ID</span>

          <strong>{order.id}</strong>
        </div>

        <div className="confirmation-meta">
          <div>
            <span>Items</span>
            <strong>{order.totalItems}</strong>
          </div>

          <div>
            <span>Total</span>

            <strong>
              INR{' '}
              {order.totalAmount.toLocaleString(
                'en-IN',
              )}
            </strong>
          </div>

          <div>
            <span>Status</span>

            <strong className="order-status">
              {order.status}
            </strong>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link
            to={`/account/orders/${order.id}`}
            className="button"
          >
            View Order Details
          </Link>

          <Link
            to="/products"
            className="button button-secondary"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  )
}

export default OrderConfirmationPage
