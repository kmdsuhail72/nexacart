import { Link, useParams } from 'react-router-dom'
import { getOrderById } from '../../services/orderService'

function OrderDetailsPage() {
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

        <Link to="/account">
          Back to My Orders
        </Link>
      </section>
    )
  }

  return (
    <section>
      <div>
        <Link to="/account">
          ← Back to My Orders
        </Link>

        <h1>Order Details</h1>

        <p>
          Order ID: <strong>{order.id}</strong>
        </p>

        <p>
          Date:{' '}
          {new Date(order.createdAt).toLocaleString('en-IN')}
        </p>

        <p>
          Status: {order.status}
        </p>
      </div>

      <div>
        <h2>Customer</h2>

        <p>
          {order.customer.firstName}{' '}
          {order.customer.lastName}
        </p>

        <p>{order.customer.email}</p>

        <p>{order.customer.phone}</p>
      </div>

      <div>
        <h2>Shipping Address</h2>

        <p>{order.shipping.addressLine1}</p>

        {order.shipping.addressLine2 && (
          <p>{order.shipping.addressLine2}</p>
        )}

        <p>
          {order.shipping.city},{' '}
          {order.shipping.state}{' '}
          {order.shipping.postalCode}
        </p>

        <p>{order.shipping.country}</p>
      </div>

      <div>
        <h2>Items</h2>

        {order.items.map((item) => (
          <article key={item.product.id}>
            <h3>{item.product.name}</h3>

            <p>
              Quantity: {item.quantity}
            </p>

            <p>
              Price: INR{' '}
              {item.product.price.toLocaleString('en-IN')}
            </p>

            <p>
              Item Total: INR{' '}
              {(item.product.price * item.quantity)
                .toLocaleString('en-IN')}
            </p>
          </article>
        ))}
      </div>

      <aside>
        <h2>Order Summary</h2>

        <p>
          Total Items: {order.totalItems}
        </p>

        <p>
          Total: INR{' '}
          {order.totalAmount.toLocaleString('en-IN')}
        </p>
      </aside>
    </section>
  )
}

export default OrderDetailsPage
