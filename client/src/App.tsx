import './App.css'

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <h1 className="logo">SteadyStep</h1>

        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <button className="login-button">Log In</button>
        </nav>
      </header>

      <main className="hero">
        <section className="hero-content">
          <p className="eyebrow">Student finance made simpler</p>

          <h2>Take control of your finances one steady step at a time.</h2>

          <p className="hero-description">
            Track expenses, build budgets, organize financial aid, and work
            toward your savings goals from one simple dashboard.
          </p>

          <div className="hero-actions">
            <button className="primary-button">Get Started</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </section>

        <section className="preview-card">
          <p className="card-label">Monthly overview</p>
          <h3>$1,240 remaining</h3>

          <div className="progress-bar">
            <div className="progress-fill"></div>
          </div>

          <div className="summary-row">
            <div>
              <span>Budget</span>
              <strong>$2,000</strong>
            </div>

            <div>
              <span>Spent</span>
              <strong>$760</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App