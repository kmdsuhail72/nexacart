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
  const [isSubmitting, setIsSubmitting] =
    useState(false)

  if (items.length === 0) {
    return (
      <section className="checkout-empty">
        <span className="section-eyebrow">
          Checkout
        </span>

        <div className="checkout-empty-icon">
          🛒
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

    const email = formData.customer.email.trim()
    const phone = formData.customer.phone.trim()
    const postalCode =
      formData.shipping.postalCode.trim()

    if (!email.includes('@')) {
      setError(
        'Please enter a valid email address.',
      )
      return
    }

    if (!/^[0-9+\-\s]{10,15}$/.test(phone)) {
      setError(
        'Please enter a valid phone number.',
      )
      return
    }

    if (!/^[0-9]{5,10}$/.test(postalCode)) {
      setError(
        'Please enter a valid postal code.',
      )
      return
    }

    setIsSubmitting(true)

    try {
      const orderId =
        `ORD-${Date.now().toString(36).toUpperCase()}`

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

      setIsSubmitting(false)
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
          Enter your delivery information and
          review your order before placing it.
        </p>
      </div>

      {error && (
        <div
          className="checkout-error"
          role="alert"
        >
          <strong>Unable to continue</strong>
          <span>{error}</span>
        </div>
      )}

      <form
        className="checkout-layout"
        onSubmit={handleSubmit}
      >
        <div className="checkout-form">
          <fieldset>
            <legend>
              <span>01</span>
              Customer Information
            </legend>

            <div className="checkout-grid">
              <label>
                <span>First Name</span>

                <input
                  name="firstName"
                  value={
                    formData.customer.firstName
                  }
                  onChange={handleCustomerChange}
                  placeholder="Enter first name"
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
                  placeholder="Enter last name"
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
            <legend>
              <span>02</span>
              Shipping Address
            </legend>

            <div className="checkout-grid">
              <label className="checkout-full">
                <span>Address Line 1</span>

                <input
                  name="addressLine1"
                  value={
                    formData.shipping.addressLine1
                  }
                  onChange={handleShippingChange}
                  placeholder="House / building / street"
                  autoComplete="address-line1"
                  required
                />
              </label>

              <label className="checkout-full">
                <span>Address Line 2</span>

                <input
                  name="addressLine2"
                  value={
                    formData.shipping.addressLine2
                  }
                  onChange={handleShippingChange}
                  placeholder="Apartment, landmark, etc. (optional)"
                  autoComplete="address-line2"
                />
              </label>

              <label>
                <span>City</span>

                <input
                  name="city"
                  value={
                    formData.shipping.city
                  }
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
                  value={
                    formData.shipping.state
                  }
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
                  placeholder="560001"
                  inputMode="numeric"
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
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? 'Placing Order...'
                : 'Place Order'}
            </Button>

            <p>
              By placing your order, you confirm
              that the information provided is
              correct.
            </p>
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
                <div className="checkout-item-info">
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

          <div className="checkout-summary-lines">
            <div>
              <span>Items</span>
              <strong>{cartCount}</strong>
            </div>

            <div>
              <span>Subtotal</span>
              <strong>
                INR{' '}
                {cartTotal.toLocaleString('en-IN')}
              </strong>
            </div>

            <div>
              <span>Delivery</span>
              <strong className="checkout-free">
                FREE
              </strong>
            </div>
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
