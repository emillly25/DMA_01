import { Header } from './header/Header'
import { Footer } from './Footer'
export default function Layout({ children }) {
  return (
    <div style={{ border: '1px solid blue' }}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
