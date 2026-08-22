import { Link } from 'react-router-dom'
import { getOrders } from '../../services/orderService'

function AccountPage() {
  const orders = getOrders()

  const totalSpent = orders.reduce(
    (total, order) => total + order.totalAmount,
    0,
  )

  return (
    <section className="account-page">
      <div className="account-header">
        <div>
          <span className="section-eyebrow">
            My Account
          </span>

          <h1>Welcome back.</h1>

          <p>
            Manage your orders and keep track of
            your NexaCart purchases.
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
        <div className="account-stat">
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>

        <div className="account-stat">
          <span>Total Items</span>

          <strong>
            {orders.reduce(
              (total, order) =>
                total + order.totalItems,
              0,
            )}
          </strong>
        </div>

        <div className="account-stat">
          <span>Total Spent</span>

          <strong>
            INR {totalSpent.toLocaleString('en-IN')}
          </strong>
        </div>
      </div>

      <section className="account-orders">
        <div className="account-section-header">
          <div>
            <span className="section-eyebrow">
              Order History
            </span>

            <h2>Your Orders</h2>
          </div>

          <span className="account-order-count">
            {orders.length}{' '}
            {orders.length === 1
              ? 'order'
              : 'orders'}
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="account-empty">
            <div className="account-empty-icon">
              ◎
            </div>

            <h2>No orders yet</h2>

            <p>
              Your completed orders will appear
              here after you place your first order.
            </p>

            <Link
              to="/products"
              className="button"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="account-order-list">
            {orders
              .slice()
              .reverse()
              .map((order) => (
                <article
                  key={order.id}
                  className="account-order-card"
                >
                  <div className="account-order-main">
                    <div className="account-order-icon">
                      #
                    </div>

                    <div>
                      <span className="account-order-label">
                        Order ID
                      </span>

                      <strong>
                        {order.id}
                      </strong>

                      <small>
                        {new Date(
                          order.createdAt,
                        ).toLocaleString('en-IN')}
                      </small>
                    </div>
                  </div>

                  <div className="account-order-meta">
                    <div>
                      <span>Items</span>

                      <strong>
                        {order.totalItems}
                      </strong>
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

                      <strong className="account-order-status">
                        {order.status}
                      </strong>
                    </div>
                  </div>

                  <Link
                    to={`/account/orders/${order.id}`}
                    className="account-order-link"
                  >
                    View Details →
                  </Link>
                </article>
              ))}
          </div>
        )}
      </section>
    </section>
  )
}

export default AccountPage
