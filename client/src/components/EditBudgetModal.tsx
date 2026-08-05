import { useState } from "react"
import type { FormEvent } from "react"
import "./EditBudgetModal.css"

type EditBudgetModalProps = {
  currentBudget: number
  onClose: () => void
  onSaveBudget: (budget: number) => void
}

function EditBudgetModal({
  currentBudget,
  onClose,
  onSaveBudget,
}: EditBudgetModalProps) {
  const [budget, setBudget] = useState(currentBudget.toString())
  const [error, setError] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericBudget = Number(budget)

    if (!budget) {
      setError("Please enter a monthly budget.")
      return
    }

    if (!Number.isFinite(numericBudget) || numericBudget <= 0) {
      setError("Your monthly budget must be greater than zero.")
      return
    }

    onSaveBudget(numericBudget)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <section
        className="budget-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="budget-modal-title"
      >
        <div className="modal-heading">
          <div>
            <p className="modal-label">Monthly planning</p>
            <h2 id="budget-modal-title">Edit Your Budget</h2>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close budget form"
          >
            ×
          </button>
        </div>

        <p className="budget-modal-description">
          Set the total amount you plan to spend this month.
        </p>

        <form className="budget-form" onSubmit={handleSubmit}>
          <label htmlFor="monthly-budget">Monthly budget</label>

          <div className="budget-input-wrapper">
            <span>$</span>

            <input
              id="monthly-budget"
              type="number"
              min="1"
              step="0.01"
              placeholder="2000.00"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
            />
          </div>

          {error && <p className="budget-form-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="modal-save-button">
              Save Budget
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default EditBudgetModal