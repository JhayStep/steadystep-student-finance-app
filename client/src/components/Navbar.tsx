import { Link } from "react-router-dom"

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo-link">
        SteadyStep
      </Link>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="#features">Features</a>
        <a href="#about">About</a>

        <Link to="/login" className="login-button">
          Log In
        </Link>
      </nav>
    </header>
  )
}

export default Navbar