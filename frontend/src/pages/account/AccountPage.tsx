import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getOrders } from '../../services/orderService'

function AccountPage() {
  const orders = useMemo(
    () => getOrders(),
    [],
  )

  const sortedOrders = [...orders].sort(
    (first, second) =>
      new Date(second.createdAt).getTime() -
      new Date(first.createdAt).getTime(),
  )

  return (
    <section className="account-page">
      <div className="account-hero">
        <div>
          <span className="section-eyebrow">
            My Account
          </span>

          <h1>Welcome back</h1>

          <p>
            Manage your orders and keep track of
            your NexaCart purchases.
          </p>
        </div>
      </div>

      <div className="account-layout">
        <aside className="account-profile-card">
          <div className="account-profile-avatar">
            NC
          </div>

          <div>
            <span className="account-profile-label">
              Customer
            </span>

            <h2>NexaCart Customer</h2>

            <p>
              Your account and order information
              is stored securely for this demo.
            </p>
          </div>

          <div className="account-profile-divider" />

          <div className="account-stat">
            <span>Total Orders</span>

            <strong>
              {sortedOrders.length}
            </strong>
          </div>
        </aside>

        <div className="account-orders-section">
          <div className="account-orders-heading">
            <div>
              <span className="section-eyebrow">
                Purchase History
              </span>

              <h2>My Orders</h2>
            </div>

            {sortedOrders.length > 0 && (
              <span className="account-order-count">
                {sortedOrders.length}{' '}
                {sortedOrders.length === 1
                  ? 'order'
                  : 'orders'}
              </span>
            )}
          </div>

          {sortedOrders.length === 0 ? (
            <div className="account-empty-card">
              <div className="account-empty-icon">
                🛍
              </div>

              <h2>No orders yet</h2>

              <p>
                Once you place an order, it will
                appear here.
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
              {sortedOrders.map((order) => (
                <article
                  key={order.id}
                  className="account-order-card"
                >
                  <div className="account-order-top">
                    <div>
                      <span className="account-order-label">
                        Order ID
                      </span>

                      <h3>{order.id}</h3>
                    </div>

                    <span
                      className={`order-status order-status-${order.status.toLowerCase()}`}
                    >
                      <span className="order-status-dot" />

                      {order.status}
                    </span>
                  </div>

                  <div className="account-order-info">
                    <div>
                      <span>Date</span>

                      <strong>
                        {new Date(
                          order.createdAt,
                        ).toLocaleDateString(
                          'en-IN',
                          {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                          },
                        )}
                      </strong>
                    </div>

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
                  </div>

                  <div className="account-order-bottom">
                    <span className="account-order-products">
                      {order.items
                        .slice(0, 2)
                        .map(
                          (item) =>
                            item.product.name,
                        )
                        .join(', ')}

                      {order.items.length > 2 &&
                        ` +${order.items.length - 2} more`}
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
      </div>
    </section>
  )
}

export default AccountPage
