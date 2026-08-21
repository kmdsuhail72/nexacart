import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import { CartProvider } from '../context/CartContext'
import HomePage from '../pages/home/HomePage'
import ProductsPage from '../pages/products/ProductsPage'
import ProductDetailsPage from '../pages/product-details/ProductDetailsPage'
import CartPage from '../pages/cart/CartPage'
import CheckoutPage from '../pages/checkout/CheckoutPage'
import OrderConfirmationPage from '../pages/order-confirmation/OrderConfirmationPage'
import AccountPage from '../pages/account/AccountPage'
import NotFoundPage from '../pages/not-found/NotFoundPage'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainLayout>
          <Routes>
            <Route
              path="/"
              element={<HomePage />}
            />

            <Route
              path="/products"
              element={<ProductsPage />}
            />

            <Route
              path="/products/:productId"
              element={<ProductDetailsPage />}
            />

            <Route
              path="/cart"
              element={<CartPage />}
            />

            <Route
              path="/checkout"
              element={<CheckoutPage />}
            />

            <Route
              path="/order-confirmation/:orderId"
              element={<OrderConfirmationPage />}
            />

            <Route
              path="/account"
              element={<AccountPage />}
            />

            <Route
              path="*"
              element={<NotFoundPage />}
            />
          </Routes>
        </MainLayout>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
