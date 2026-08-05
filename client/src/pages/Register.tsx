import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import type { FormEvent } from "react"

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!name || !email || !password || !confirmPassword) {
      setMessage("Please complete every field.")
      return
    }

    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.")
      return
    }

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.")
      return
    }

    localStorage.setItem(
      "steadystepUser",
      JSON.stringify({
        name,
        email,
      }),
    )

    navigate("/dashboard")
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-brand">SteadyStep</p>

        <h1>Create Your Account</h1>

        <p className="auth-subtitle">
          Start organizing your budget, expenses, bills, and financial goals.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            type="text"
            placeholder="Jhaydn Steplight"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="register-password">Password</label>
          <input
            id="register-password"
            type="password"
            placeholder="Enter at least 8 characters"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Enter your password again"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />

          <button type="submit" className="auth-submit-button">
            Create Account
          </button>

          {message && <p className="auth-message">{message}</p>}
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="text-link">
            Log in
          </Link>
        </p>

        <p className="auth-footer-text">
          <Link to="/" className="text-link">
            Return to homepage
          </Link>
        </p>
      </section>
    </main>
  )
}

export default Register