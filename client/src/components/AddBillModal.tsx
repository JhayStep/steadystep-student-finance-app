import { useState } from "react"
import type { FormEvent } from "react"
import "./AddBillModal.css"

export type Bill = {
  id: number
  name: string
  amount: number
  dueDate: string
}

type AddBillModalProps = {
  onClose: () => void
  onAddBill: (bill: Bill) => void
}

function AddBillModal({
  onClose,
  onAddBill,
}: AddBillModalProps) {
  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const numericAmount = Number(amount)

    if (!name.trim() || !amount || !dueDate) {
      setError("Please complete every required field.")
      return
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setError("Bill amount must be greater than zero.")
      return
    }

    onAddBill({
      id: Date.now(),
      name: name.trim(),
      amount: numericAmount,
      dueDate,
    })

    onClose()
  }

  return (
    <div className="modal-overlay">
      <section
        className="bill-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bill-modal-title"
      >
        <div className="modal-heading">
          <div>
            <p className="modal-label">Upcoming payment</p>
            <h2 id="bill-modal-title">Add a Bill</h2>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close bill form"
          >
            ×
          </button>
        </div>

        <form className="bill-form" onSubmit={handleSubmit}>
          <label htmlFor="bill-name">Bill name</label>
          <input
            id="bill-name"
            type="text"
            placeholder="Example: Rent"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <label htmlFor="bill-amount">Amount</label>
          <input
            id="bill-amount"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />

          <label htmlFor="bill-due-date">Due date</label>
          <input
            id="bill-due-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />

          {error && <p className="bill-form-error">{error}</p>}

          <div className="modal-actions">
            <button
              type="button"
              className="modal-cancel-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="modal-save-button">
              Save Bill
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default AddBillModal