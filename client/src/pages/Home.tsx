import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import BudgetPreview from "../components/BudgetPreview"
import Footer from "../components/Footer"

function Home() {
  return (
    <div className="app">
      <Navbar />

      <main className="hero">
        <Hero />
        <BudgetPreview />
      </main>

      <Footer />
    </div>
  )
}

export default Home