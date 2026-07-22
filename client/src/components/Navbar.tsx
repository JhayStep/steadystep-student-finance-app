function Navbar() {
  return (
    <header className="navbar">
      <h1 className="logo">SteadyStep</h1>

      <nav className="nav-links">
        <a href="#features">Features</a>
        <a href="#about">About</a>
        <button className="login-button">Log In</button>
      </nav>
    </header>
  )
}

export default Navbar