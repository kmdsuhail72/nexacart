import type { CartItem as CartItemType } from '../../context/CartContext'
import Button from '../ui/Button'
import { useCart } from '../../hooks/useCart'

interface CartItemProps {
  item: CartItemType
}

function CartItem({ item }: CartItemProps) {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart()

  const { product, quantity } = item

  return (
    <article>
      <div>
        <h2>{product.name}</h2>

        <p>{product.description}</p>

        <p>
          {product.currency}{' '}
          {product.price.toLocaleString('en-IN')}
        </p>

        <div>
          <Button
            onClick={() => decreaseQuantity(product.id)}
          >
            -
          </Button>

          <span>{quantity}</span>

          <Button
            onClick={() => increaseQuantity(product.id)}
          >
            +
          </Button>

          <Button
            onClick={() => removeFromCart(product.id)}
          >
            Remove
          </Button>
        </div>

        <p>
          Item total:{' '}
          {product.currency}{' '}
          {(product.price * quantity).toLocaleString('en-IN')}
        </p>
      </div>
    </article>
  )
}

export default CartItem
