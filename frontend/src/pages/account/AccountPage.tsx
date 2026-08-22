import { Link } from 'react-router-dom'
import { getOrders } from '../../services/orderService'

function AccountPage() {
  const orders = getOrders()

  const totalSpent = orders.reduce(
    (total, order) =>
      total + order.totalAmount,
    0,
  )

  const totalItems = orders.reduce(
    (total, order) =>
      total + order.totalItems,
    0,
  )

  return (
    <section className="account-page">
      <div className="account-header">
        <div>
          <span className="section-eyebrow">
            My Account
          </span>

          <h1>Welcome back</h1>

          <p>
            Manage your NexaCart orders and review
            your purchase history.
          </p>
        </div>

        <Link
          to="/products"
          className="button"
        >
          Continue Shopping
        </Link>
      </div>

      <div className="account-stats">
        <article>
          <span>Orders</span>
          <strong>{orders.length}</strong>
        </article>

        <article>
          <span>Items Purchased</span>
          <strong>{totalItems}</strong>
        </article>

        <article>
          <span>Total Spent</span>

          <strong>
            INR {totalSpent.toLocaleString('en-IN')}
          </strong>
        </article>
      </div>

      <div className="account-orders">
        <div className="account-section-header">
          <div>
            <span className="section-eyebrow">
              Purchase History
            </span>

            <h2>Your Orders</h2>
          </div>

          <span>
            {orders.length}{' '}
            {orders.length === 1
              ? 'order'
              : 'orders'}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="account-empty">
            <div className="account-empty-icon">
              📦
            </div>

            <h2>No orders yet</h2>

            <p>
              Your completed purchases will appear
              here.
            </p>

            <Link
              to="/products"
              className="button"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="order-list">
            {[...orders]
              .reverse()
              .map((order) => (
                <article
                  key={order.id}
                  className="order-card"
                >
                  <div className="order-card-main">
                    <div>
                      <span className="order-label">
                        Order ID
                      </span>

                      <strong>
                        {order.id}
                      </strong>
                    </div>

                    <div>
                      <span className="order-label">
                        Date
                      </span>

                      <span>
                        {new Date(
                          order.createdAt,
                        ).toLocaleDateString(
                          'en-IN',
                        )}
                      </span>
                    </div>

                    <div>
                      <span className="order-label">
                        Items
                      </span>

                      <span>
                        {order.totalItems}
                      </span>
                    </div>

                    <div>
                      <span className="order-label">
                        Total
                      </span>

                      <strong>
                        INR{' '}
                        {order.totalAmount.toLocaleString(
                          'en-IN',
                        )}
                      </strong>
                    </div>
                  </div>

                  <div className="order-card-action">
                    <span className="order-status">
                      {order.status}
                    </span>

                    <Link
                      to={`/account/orders/${order.id}`}
                      className="button button-secondary"
                    >
                      View Details
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default AccountPage
