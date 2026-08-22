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
          Secure Checkout
        </span>

        <div className="checkout-empty-icon">
          ✓
        </div>

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

        <div className="checkout-heading">
          <span className="section-eyebrow">
            Secure Checkout
          </span>

          <h1>Complete Your Order</h1>

          <p>
            Enter your delivery information to
            place your NexaCart order.
          </p>
        </div>

        <div className="checkout-progress">
          <div className="checkout-step checkout-step-active">
            <span>1</span>
            <strong>Details</strong>
          </div>

          <div className="checkout-progress-line" />

          <div className="checkout-step">
            <span>2</span>
            <strong>Confirmation</strong>
          </div>
        </div>
      </div>

      {error && (
        <div
          className="checkout-error"
          role="alert"
        >
          <strong>Something went wrong.</strong>
          <span>{error}</span>
        </div>
      )}

      <form
        className="checkout-layout"
        onSubmit={handleSubmit}
      >
        <div className="checkout-form">
          <fieldset>
            <div className="checkout-fieldset-heading">
              <span className="checkout-section-number">
                01
              </span>

              <div>
                <legend>
                  Customer Information
                </legend>

                <p>
                  Tell us how we can contact you
                  about your order.
                </p>
              </div>
            </div>

            <div className="checkout-grid">
              <label>
                <span>First Name</span>

                <input
                  name="firstName"
                  value={
                    formData.customer.firstName
                  }
                  onChange={handleCustomerChange}
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  required
                />
              </label>

              <label>
                <span>Last Name</span>

                <input
                  name="lastName"
                  value={
                    formData.customer.lastName
                  }
                  onChange={handleCustomerChange}
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  required
                />
              </label>

              <label>
                <span>Email Address</span>

                <input
                  type="email"
                  name="email"
                  value={
                    formData.customer.email
                  }
                  onChange={handleCustomerChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                <span>Phone Number</span>

                <input
                  type="tel"
                  name="phone"
                  value={
                    formData.customer.phone
                  }
                  onChange={handleCustomerChange}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  required
                />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <div className="checkout-fieldset-heading">
              <span className="checkout-section-number">
                02
              </span>

              <div>
                <legend>
                  Shipping Address
                </legend>

                <p>
                  Where should we deliver your
                  order?
                </p>
              </div>
            </div>

            <div className="checkout-grid">
              <label className="checkout-full">
                <span>Address Line 1</span>

                <input
                  name="addressLine1"
                  value={
                    formData.shipping.addressLine1
                  }
                  onChange={handleShippingChange}
                  placeholder="House number and street"
                  autoComplete="address-line1"
                  required
                />
              </label>

              <label className="checkout-full">
                <span>
                  Address Line 2
                  <small>Optional</small>
                </span>

                <input
                  name="addressLine2"
                  value={
                    formData.shipping.addressLine2
                  }
                  onChange={handleShippingChange}
                  placeholder="Apartment, suite, landmark"
                  autoComplete="address-line2"
                />
              </label>

              <label>
                <span>City</span>

                <input
                  name="city"
                  value={formData.shipping.city}
                  onChange={handleShippingChange}
                  placeholder="City"
                  autoComplete="address-level2"
                  required
                />
              </label>

              <label>
                <span>State</span>

                <input
                  name="state"
                  value={formData.shipping.state}
                  onChange={handleShippingChange}
                  placeholder="State"
                  autoComplete="address-level1"
                  required
                />
              </label>

              <label>
                <span>Postal Code</span>

                <input
                  name="postalCode"
                  value={
                    formData.shipping.postalCode
                  }
                  onChange={handleShippingChange}
                  placeholder="Postal code"
                  autoComplete="postal-code"
                  required
                />
              </label>

              <label>
                <span>Country</span>

                <input
                  name="country"
                  value={
                    formData.shipping.country
                  }
                  onChange={handleShippingChange}
                  autoComplete="country-name"
                  required
                />
              </label>
            </div>
          </fieldset>

          <div className="checkout-submit">
            <div>
              <strong>Ready to place your order?</strong>

              <span>
                Review your information before
                continuing.
              </span>
            </div>

            <Button type="submit">
              Place Order →
            </Button>
          </div>
        </div>

        <aside className="checkout-summary">
          <div className="checkout-summary-header">
            <span className="section-eyebrow">
              Your Order
            </span>

            <h2>Order Summary</h2>
          </div>

          <div className="checkout-items">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="checkout-item"
              >
                <div className="checkout-item-image">
                  {item.product.name.charAt(0)}
                </div>

                <div className="checkout-item-info">
                  <strong>
                    {item.product.name}
                  </strong>

                  <span>
                    Qty: {item.quantity}
                  </span>
                </div>

                <strong className="checkout-item-total">
                  INR{' '}
                  {(
                    item.product.price *
                    item.quantity
                  ).toLocaleString('en-IN')}
                </strong>
              </div>
            ))}
          </div>

          <div className="checkout-summary-details">
            <div>
              <span>Items</span>
              <strong>{cartCount}</strong>
            </div>

            <div>
              <span>Subtotal</span>

              <strong>
                INR{' '}
                {cartTotal.toLocaleString(
                  'en-IN',
                )}
              </strong>
            </div>

            <div>
              <span>Delivery</span>

              <strong className="checkout-free">
                FREE
              </strong>
            </div>
          </div>

          <div className="checkout-total">
            <span>Total</span>

            <strong>
              INR{' '}
              {cartTotal.toLocaleString(
                'en-IN',
              )}
            </strong>
          </div>

          <div className="checkout-trust">
            <span>✓</span>

            <div>
              <strong>Secure checkout</strong>

              <p>
                Your order information is stored
                securely on this device.
              </p>
            </div>
          </div>
        </aside>
      </form>
    </section>
  )
}

export default CheckoutPage
