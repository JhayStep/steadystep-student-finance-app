import { useState } from "react"
import type { FormEvent } from "react"
import "./AddExpenseModal.css"

export type Expense = {
  id: number
  description: string
  category: string
  amount: number
  date: string
}

type AddExpenseModalProps = {
  onClose: () => void
  onAddExpense: (expense: Expense) => void
}

function AddExpenseModal({
  onClose,
  onAddExpense,
}: AddExpenseModalProps) {
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Food")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0],
  )
  const [error, setError] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (!description.trim() || !amount || !date) {
      setError("Please complete every required field.")
      return
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Expense amount must be greater than zero.")
      return
    }

    onAddExpense({
      id: Date.now(),
      description: description.trim(),
      category,
      amount: numericAmount,
      date,
    })

    onClose()
  }

  return (
    <div className="modal-overlay">
      <section
        className="expense-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="expense-modal-title"
      >
        <div className="modal-heading">
          <div>
            <p className="modal-label">New transaction</p>
            <h2 id="expense-modal-title">Add an Expense</h2>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close expense form"
          >
            ×
          </button>
        </div>

        <form className="expense-form" onSubmit={handleSubmit}>
          <label htmlFor="expense-description">Description</label>
          <input
            id="expense-description"
            type="text"
            placeholder="Example: Groceries"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />

          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="Housing">Housing</option>
            <option value="Food">Food</option>
            <option value="School">School</option>
            <option value="Transportation">Transportation</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="expense-amount">Amount</label>
          <input
            id="expense-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

          <label htmlFor="expense-date">Date</label>
          <input
            id="expense-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />

          {error && <p className="expense-form-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="modal-save-button">
              Save Expense
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddExpenseModal