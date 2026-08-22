import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'

function OrderConfirmationPage() {
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
          Order
        </span>

        <h1>Order Not Found</h1>

        <p>
          We could not find the requested order.
          It may have been removed from this device.
        </p>

        <Link
          to="/products"
          className="button"
        >
          Continue Shopping
        </Link>
      </section>
    )
  }

  return (
    <section className="order-result">
      <div className="order-success-icon">
        ✓
      </div>

      <span className="section-eyebrow">
        Order Confirmed
      </span>

      <h1>Thank you for your order.</h1>

      <p className="order-result-message">
        Your NexaCart order has been received
        successfully. We've saved the order details
        on this device.
      </p>

      <div className="order-confirmation-card">
        <div>
          <span>Order ID</span>

          <strong>{order.id}</strong>
        </div>

        <div>
          <span>Status</span>

          <strong className="order-status">
            {order.status}
          </strong>
        </div>

        <div>
          <span>Total Items</span>

          <strong>{order.totalItems}</strong>
        </div>

        <div>
          <span>Total Amount</span>

          <strong>
            INR{' '}
            {order.totalAmount.toLocaleString(
              'en-IN',
            )}
          </strong>
        </div>
      </div>

      <div className="order-result-actions">
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

      <p className="order-result-note">
        Keep your order ID for reference:
        <strong> {order.id}</strong>
      </p>
    </section>
  )
}

export default OrderConfirmationPage
