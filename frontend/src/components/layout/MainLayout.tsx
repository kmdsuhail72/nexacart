import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'

interface MainLayoutProps {
  children: ReactNode
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="app-shell">
      <Header />

      <main className="app-content">
        {children}
      </main>

      <Footer />
    </div>
  )
}

export default MainLayout
