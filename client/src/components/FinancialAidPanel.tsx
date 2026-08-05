import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"
import "./FinancialAidPanel.css"

type AidDeadline = {
  id: number
  title: string
  dueDate: string
  status: "Planned" | "In Progress" | "Submitted"
}

const startingDeadlines: AidDeadline[] = [
  {
    id: 201,
    title: "Scholarship application",
    dueDate: "2026-09-15",
    status: "In Progress",
  },
  {
    id: 202,
    title: "FAFSA document review",
    dueDate: "2026-10-01",
    status: "Planned",
  },
]

function loadDeadlines(): AidDeadline[] {
  const savedDeadlines = localStorage.getItem(
    "steadystepAidDeadlines",
  )

  if (!savedDeadlines) {
    return startingDeadlines
  }

  try {
    const parsedDeadlines = JSON.parse(savedDeadlines)

    return Array.isArray(parsedDeadlines)
      ? parsedDeadlines
      : startingDeadlines
  } catch {
    return startingDeadlines
  }
}

function FinancialAidPanel() {
  const [deadlines, setDeadlines] =
    useState<AidDeadline[]>(loadDeadlines)

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] =
    useState<AidDeadline["status"]>("Planned")
  const [error, setError] = useState("")

  const sortedDeadlines = useMemo(() => {
    return [...deadlines].sort(
      (firstDeadline, secondDeadline) =>
        new Date(firstDeadline.dueDate).getTime() -
        new Date(secondDeadline.dueDate).getTime(),
    )
  }, [deadlines])

  useEffect(() => {
    localStorage.setItem(
      "steadystepAidDeadlines",
      JSON.stringify(deadlines),
    )
  }, [deadlines])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!title.trim() || !dueDate) {
      setError("Please enter a title and due date.")
      return
    }

    const newDeadline: AidDeadline = {
      id: Date.now(),
      title: title.trim(),
      dueDate,
      status,
    }

    setDeadlines((currentDeadlines) => [
      ...currentDeadlines,
      newDeadline,
    ])

    setTitle("")
    setDueDate("")
    setStatus("Planned")
    setError("")
    setIsFormOpen(false)
  }

  function handleDelete(deadlineId: number) {
    setDeadlines((currentDeadlines) =>
      currentDeadlines.filter(
        (deadline) => deadline.id !== deadlineId,
      ),
    )
  }

  function handleStatusChange(
    deadlineId: number,
    updatedStatus: AidDeadline["status"],
  ) {
    setDeadlines((currentDeadlines) =>
      currentDeadlines.map((deadline) =>
        deadline.id === deadlineId
          ? { ...deadline, status: updatedStatus }
          : deadline,
      ),
    )
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${date}T12:00:00`))
  }

  return (
    <article className="dashboard-panel financial-aid-panel">
      <div className="panel-heading">
        <div>
          <p className="panel-label">Financial aid</p>
          <h2>Important deadlines</h2>
        </div>

        <button
          type="button"
          className="panel-button"
          onClick={() => {
            setError("")
            setIsFormOpen((currentValue) => !currentValue)
          }}
        >
          {isFormOpen ? "Cancel" : "Add Deadline"}
        </button>
      </div>

      {isFormOpen && (
        <form
          className="financial-aid-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="aid-title">Deadline title</label>
          <input
            id="aid-title"
            type="text"
            placeholder="Example: Grant application"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label htmlFor="aid-date">Due date</label>
          <input
            id="aid-date"
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
          />

          <label htmlFor="aid-status">Status</label>
          <select
            id="aid-status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as AidDeadline["status"],
              )
            }
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">In Progress</option>
            <option value="Submitted">Submitted</option>
          </select>

          {error && (
            <p className="financial-aid-error">{error}</p>
          )}

          <button
            type="submit"
            className="financial-aid-save-button"
          >
            Save Deadline
          </button>
        </form>
      )}

      <div className="financial-aid-list">
        {sortedDeadlines.length === 0 ? (
          <p className="empty-state">
            No financial-aid deadlines have been added.
          </p>
        ) : (
          sortedDeadlines.map((deadline) => (
            <div
              className="financial-aid-item"
              key={deadline.id}
            >
              <div>
                <strong>{deadline.title}</strong>
                <span>Due {formatDate(deadline.dueDate)}</span>
              </div>

              <div className="financial-aid-actions">
                <select
                  aria-label={`Status for ${deadline.title}`}
                  value={deadline.status}
                  onChange={(event) =>
                    handleStatusChange(
                      deadline.id,
                      event.target
                        .value as AidDeadline["status"],
                    )
                  }
                >
                  <option value="Planned">Planned</option>
                  <option value="In Progress">
                    In Progress
                  </option>
                  <option value="Submitted">Submitted</option>
                </select>

                <button
                  type="button"
                  className="delete-deadline-button"
                  onClick={() => handleDelete(deadline.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  )
}

export default FinancialAidPanel