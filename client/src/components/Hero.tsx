import { Link } from "react-router-dom"

function Hero() {
  return (
    <section className="hero-content">
      <p className="eyebrow">Student finance made simpler</p>

      <h2>Take control of your finances one steady step at a time.</h2>

      <p className="hero-description">
        Track expenses, build budgets, organize financial aid, and work toward
        your savings goals from one simple dashboard.
      </p>

      <div className="hero-actions">
        <Link to="/register" className="primary-button">
          Get Started
        </Link>

        <a href="#features" className="secondary-button">
          Learn More
        </a>
      </div>
    </section>
  )
}

export default Hero