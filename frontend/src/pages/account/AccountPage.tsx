import { Link } from 'react-router-dom'
import { getOrders } from '../../services/orderService'

function AccountPage() {
  const orders = getOrders()

  return (
    <section>
      <div>
        <h1>My Account</h1>
        <p>View your NexaCart orders and account activity.</p>
      </div>

      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <div>
          <p>You have not placed any orders yet.</p>

          <Link to="/products">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <article key={order.id}>
                <h3>
                  Order {order.id}
                </h3>

                <p>
                  Date:{' '}
                  {new Date(order.createdAt).toLocaleString('en-IN')}
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

                <Link
                  to={`/order-confirmation/${order.id}`}
                >
                  View Order
                </Link>
              </article>
            ))}
        </div>
      )}
    </section>
  )
}

export default AccountPage
