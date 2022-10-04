import { Header } from './header/Header'
import { Footer } from './Footer'
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
