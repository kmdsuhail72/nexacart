import { Link } from 'react-router-dom'

function OrderConfirmationPage() {
  return (
    <section>
      <h1>Order Confirmed</h1>

      <p>
        Thank you for shopping with NexaCart.
      </p>

      <p>
        Your order has been received successfully.
      </p>

      <Link to="/products">
        Continue Shopping
      </Link>
    </section>
  )
}

export default OrderConfirmationPage
