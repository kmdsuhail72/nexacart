export interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface ShippingAddress {
  addressLine1: string
  addressLine2: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface CheckoutData {
  customer: CustomerInfo
  shipping: ShippingAddress
}
