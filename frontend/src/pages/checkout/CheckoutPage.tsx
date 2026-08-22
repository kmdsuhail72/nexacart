import { useState } from 'react'
import type {
  ChangeEvent,
  FormEvent,
} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useCart } from '../../hooks/useCart'
import { createOrder } from '../../services/orderService'
import type { CheckoutData } from '../../types/checkout'

function CheckoutPage() {
  const navigate = useNavigate()

  const {
    items,
    cartCount,
    cartTotal,
    clearCart,
  } = useCart()

  const [formData, setFormData] =
    useState<CheckoutData>({
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
      },
      shipping: {
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
      },
    })

  const [error, setError] = useState('')

  if (items.length === 0) {
    return (
      <section className="checkout-empty">
        <span className="section-eyebrow">
          Checkout
        </span>

        <h1>Your cart is empty</h1>

        <p>
          Add products to your cart before
          proceeding to checkout.
        </p>

        <Link
          to="/products"
          className="button"
        >
          Browse Products
        </Link>
      </section>
    )
  }

  function handleCustomerChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      customer: {
        ...current.customer,
        [name]: value,
      },
    }))
  }

  function handleShippingChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const { name, value } = event.target

    setFormData((current) => ({
      ...current,
      shipping: {
        ...current.shipping,
        [name]: value,
      },
    }))
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()
    setError('')

    const orderId =
      `ORD-${Date.now().toString(36).toUpperCase()}`

    try {
      createOrder({
        id: orderId,
        createdAt: new Date().toISOString(),
        status: 'CONFIRMED',

        customer: formData.customer,

        shipping: formData.shipping,

        items,

        totalItems: cartCount,

        totalAmount: cartTotal,
      })

      clearCart()

      navigate(
        `/order-confirmation/${orderId}`,
      )
    } catch {
      setError(
        'Unable to place your order. Please try again.',
      )
    }
  }

  return (
    <section className="checkout-page">
      <div className="checkout-header">
        <Link
          to="/cart"
          className="back-link"
        >
          ← Back to Cart
        </Link>

        <span className="section-eyebrow">
          Secure Checkout
        </span>

        <h1>Complete Your Order</h1>

        <p>
          Enter your delivery information to
          place your NexaCart order.
        </p>
      </div>

      {error && (
        <div
          className="checkout-error"
          role="alert"
        >
          {error}
        </div>
      )}

      <form
        className="checkout-layout"
        onSubmit={handleSubmit}
      >
        <div className="checkout-form">
          <fieldset>
            <legend>Customer Information</legend>

            <div className="checkout-grid">
              <label>
                First Name

                <input
                  name="firstName"
                  value={
                    formData.customer.firstName
                  }
                  onChange={handleCustomerChange}
                  required
                />
              </label>

              <label>
                Last Name

                <input
                  name="lastName"
                  value={
                    formData.customer.lastName
                  }
                  onChange={handleCustomerChange}
                  required
                />
              </label>

              <label>
                Email

                <input
                  type="email"
                  name="email"
                  value={
                    formData.customer.email
                  }
                  onChange={handleCustomerChange}
                  required
                />
              </label>

              <label>
                Phone

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.customer.phone
                  }
                  onChange={handleCustomerChange}
                  required
                />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend>Shipping Address</legend>

            <div className="checkout-grid">
              <label className="checkout-full">
                Address Line 1

                <input
                  name="addressLine1"
                  value={
                    formData.shipping.addressLine1
                  }
                  onChange={handleShippingChange}
                  required
                />
              </label>

              <label className="checkout-full">
                Address Line 2

                <input
                  name="addressLine2"
                  value={
                    formData.shipping.addressLine2
                  }
                  onChange={handleShippingChange}
                />
              </label>

              <label>
                City

                <input
                  name="city"
                  value={formData.shipping.city}
                  onChange={handleShippingChange}
                  required
                />
              </label>

              <label>
                State

                <input
                  name="state"
                  value={formData.shipping.state}
                  onChange={handleShippingChange}
                  required
                />
              </label>

              <label>
                Postal Code

                <input
                  name="postalCode"
                  value={
                    formData.shipping.postalCode
                  }
                  onChange={handleShippingChange}
                  required
                />
              </label>

              <label>
                Country

                <input
                  name="country"
                  value={
                    formData.shipping.country
                  }
                  onChange={handleShippingChange}
                  required
                />
              </label>
            </div>
          </fieldset>

          <Button type="submit">
            Place Order
          </Button>
        </div>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="checkout-item"
              >
                <div>
                  <strong>
                    {item.product.name}
                  </strong>

                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>

                <strong>
                  INR{' '}
                  {(
                    item.product.price *
                    item.quantity
                  ).toLocaleString('en-IN')}
                </strong>
              </div>
            ))}
          </div>

          <div className="checkout-total">
            <span>Total Items</span>

            <strong>
              {cartCount}
            </strong>
          </div>

          <div className="checkout-total checkout-total-final">
            <span>Total</span>

            <strong>
              INR{' '}
              {cartTotal.toLocaleString('en-IN')}
            </strong>
          </div>
        </aside>
      </form>
    </section>
  )
}

export default CheckoutPage
