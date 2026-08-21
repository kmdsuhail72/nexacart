import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'

function OrderConfirmationPage() {
  const { orderId } = useParams()

  const order = orderId
    ? getOrderById(orderId)
    : undefined

  if (!order) {
    return (
      <section>
        <h1>Order Not Found</h1>

        <p>
          We could not find the requested order.
        </p>

        <Link to="/products">
          Continue Shopping
        </Link>
      </section>
    )
  }

  return (
    <section>
      <h1>Order Confirmed</h1>

      <p>
        Thank you for shopping with NexaCart.
      </p>

      <p>
        Your order has been received successfully.
      </p>

      <h2>Order Details</h2>

      <p>
        Order ID: <strong>{order.id}</strong>
      </p>

      <p>
        Customer:{' '}
        {order.customer.firstName}{' '}
        {order.customer.lastName}
      </p>

      <p>
        Items: {order.totalItems}
      </p>

      <p>
        Total: INR{' '}
        {order.totalAmount.toLocaleString('en-IN')}
      </p>

      <p>
        Status: {order.status}
      </p>

      <Link to="/products">
        Continue Shopping
      </Link>
    </section>
  )
}

export default OrderConfirmationPage
