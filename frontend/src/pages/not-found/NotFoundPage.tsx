import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section>
      <h1>404</h1>
      <h2>Page not found</h2>
      <p>The page you are looking for does not exist.</p>

      <Link to="/">Return to Home</Link>
    </section>
  )
}

export default NotFoundPage
