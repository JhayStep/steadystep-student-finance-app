import { useState } from "react"
import type { FormEvent } from "react"
import "./EditSavingsModal.css"

type EditSavingsModalProps = {
  currentSavings: number
  currentGoal: number
  onClose: () => void
  onSave: (savings: number, goal: number) => void
}

function EditSavingsModal({
  currentSavings,
  currentGoal,
  onClose,
  onSave,
}: EditSavingsModalProps) {
  const [contribution, setContribution] = useState("")
  const [goal, setGoal] = useState(currentGoal.toString())
  const [error, setError] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericContribution = contribution
      ? Number(contribution)
      : 0
    const numericGoal = Number(goal)

    if (
      !Number.isFinite(numericContribution) ||
      numericContribution < 0
    ) {
      setError("Savings contribution cannot be negative.")
      return
    }

    if (!Number.isFinite(numericGoal) || numericGoal <= 0) {
      setError("Your savings goal must be greater than zero.")
      return
    }

    onSave(currentSavings + numericContribution, numericGoal)
    onClose()
  }

  return (
    <div className="modal-overlay">
      <section
        className="savings-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="savings-modal-title"
      >
        <div className="modal-heading">
          <div>
            <p className="modal-label">Savings progress</p>
            <h2 id="savings-modal-title">Update Savings Goal</h2>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close savings form"
          >
            ×
          </button>
        </div>

        <p className="savings-modal-description">
          Add money to your savings and adjust your target when needed.
        </p>

        <form className="savings-form" onSubmit={handleSubmit}>
          <div className="current-savings-display">
            <span>Currently saved</span>
            <strong>
              ${currentSavings.toFixed(2)}
            </strong>
          </div>

          <label htmlFor="savings-contribution">
            New contribution
          </label>

          <div className="savings-input-wrapper">
            <span>$</span>
            <input
              id="savings-contribution"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={contribution}
              onChange={(event) =>
                setContribution(event.target.value)
              }
            />
          </div>

          <label htmlFor="savings-goal">Savings goal</label>

          <div className="savings-input-wrapper">
            <span>$</span>
            <input
              id="savings-goal"
              type="number"
              min="1"
              step="0.01"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            />
          </div>

          {error && <p className="savings-form-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="modal-save-button">
              Save Progress
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default EditSavingsModal