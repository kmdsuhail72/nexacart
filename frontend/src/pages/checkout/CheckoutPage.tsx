import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../../hooks/useCart'
import type { CheckoutData } from '../../types/checkout'
import Button from '../../components/ui/Button'
import { createOrder } from '../../services/orderService'
import type { Order } from '../../types/order'

const initialCheckoutData: CheckoutData = {
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
}

function CheckoutPage() {
  const navigate = useNavigate()

  const {
    items,
    cartCount,
    cartTotal,
    clearCart,
  } = useCart()

  const [formData, setFormData] =
    useState<CheckoutData>(initialCheckoutData)

  if (items.length === 0) {
    return (
      <section>
        <h1>Your cart is empty</h1>
        <p>Add products to your cart before checkout.</p>
        <Link to="/products">Continue Shopping</Link>
      </section>
    )
  }

  function updateCustomer(
    field: keyof CheckoutData['customer'],
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      customer: {
        ...current.customer,
        [field]: value,
      },
    }))
  }

  function updateShipping(
    field: keyof CheckoutData['shipping'],
    value: string,
  ) {
    setFormData((current) => ({
      ...current,
      shipping: {
        ...current.shipping,
        [field]: value,
      },
    }))
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    const order: Order = {
      id: `NEXA-${Date.now()}`,
      customer: formData.customer,
      shipping: formData.shipping,
      items,
      totalItems: cartCount,
      totalAmount: cartTotal,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    }

    createOrder(order)

    clearCart()

    navigate(`/order-confirmation/${order.id}`)
  }

  return (
    <section>
      <div>
        <Link to="/cart">← Back to Cart</Link>

        <h1>Checkout</h1>
        <p>Complete your details to place your order.</p>
      </div>

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Customer Information</legend>

          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              required
              value={formData.customer.firstName}
              onChange={(event) =>
                updateCustomer(
                  'firstName',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              required
              value={formData.customer.lastName}
              onChange={(event) =>
                updateCustomer(
                  'lastName',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={formData.customer.email}
              onChange={(event) =>
                updateCustomer(
                  'email',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.customer.phone}
              onChange={(event) =>
                updateCustomer(
                  'phone',
                  event.target.value,
                )
              }
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Shipping Address</legend>

          <div>
            <label htmlFor="addressLine1">
              Address
            </label>
            <input
              id="addressLine1"
              required
              value={formData.shipping.addressLine1}
              onChange={(event) =>
                updateShipping(
                  'addressLine1',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <label htmlFor="addressLine2">
              Apartment / Landmark
            </label>
            <input
              id="addressLine2"
              value={formData.shipping.addressLine2}
              onChange={(event) =>
                updateShipping(
                  'addressLine2',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <input
              id="city"
              required
              value={formData.shipping.city}
              onChange={(event) =>
                updateShipping(
                  'city',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <label htmlFor="state">State</label>
            <input
              id="state"
              required
              value={formData.shipping.state}
              onChange={(event) =>
                updateShipping(
                  'state',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <label htmlFor="postalCode">
              Postal Code
            </label>
            <input
              id="postalCode"
              required
              value={formData.shipping.postalCode}
              onChange={(event) =>
                updateShipping(
                  'postalCode',
                  event.target.value,
                )
              }
            />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              required
              value={formData.shipping.country}
              onChange={(event) =>
                updateShipping(
                  'country',
                  event.target.value,
                )
              }
            />
          </div>
        </fieldset>

        <aside>
          <h2>Order Summary</h2>

          <p>Total items: {cartCount}</p>

          <p>
            Total: INR{' '}
            {cartTotal.toLocaleString('en-IN')}
          </p>
        </aside>

        <Button type="submit">
          Place Order
        </Button>
      </form>
    </section>
  )
}

export default CheckoutPage
