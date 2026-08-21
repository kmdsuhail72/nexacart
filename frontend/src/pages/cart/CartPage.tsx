import CartItem from '../../components/cart/CartItem'
import CartSummary from '../../components/cart/CartSummary'
import { useCart } from '../../hooks/useCart'

function CartPage() {
  const { items } = useCart()

  return (
    <section>
      <h1>Your Cart</h1>

      {items.length === 0 ? (
        <p>Your shopping cart is currently empty.</p>
      ) : (
        <>
          <div>
            {items.map((item) => (
              <CartItem
                key={item.product.id}
                item={item}
              />
            ))}
          </div>

          <CartSummary />
        </>
      )}
    </section>
  )
}

export default CartPage
