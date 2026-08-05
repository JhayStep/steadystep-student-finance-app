import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import type { FormEvent } from "react"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email || !password) {
      setMessage("Please enter both your email and password.")
      return
    }

    localStorage.setItem(
      "steadystepUser",
      JSON.stringify({
        email,
        rememberMe,
      }),
    )

    navigate("/dashboard")
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="auth-brand">SteadyStep</p>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Sign in to continue managing your student finances.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="student@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="auth-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Remember me
            </label>

            <button type="button" className="text-button">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="auth-submit-button">
            Log In
          </button>

          {message && <p className="auth-message">{message}</p>}
        </form>

        <p className="auth-footer-text">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-link">
            Create account
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

export default Login