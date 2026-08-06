import { useEffect, useMemo, useState } from "react"
import type { FormEvent } from "react"

import {
  addAidDeadline,
  deleteAidDeadline,
  getAidDeadlines,
  updateAidDeadlineStatus,
} from "../api/aidDeadlineApi"
import type {
  AidDeadline,
  AidDeadlineStatus,
} from "../api/aidDeadlineApi"

import "./FinancialAidPanel.css"

function FinancialAidPanel() {
  const [deadlines, setDeadlines] = useState<
    AidDeadline[]
  >([])

  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] =
    useState(false)

  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] =
    useState<AidDeadlineStatus>("Planned")

  const [error, setError] = useState("")

  const sortedDeadlines = useMemo(() => {
    return [...deadlines].sort(
      (firstDeadline, secondDeadline) =>
        new Date(firstDeadline.dueDate).getTime() -
        new Date(secondDeadline.dueDate).getTime(),
    )
  }, [deadlines])

  useEffect(() => {
    async function loadDeadlines() {
      try {
        setIsLoading(true)
        setError("")

        const apiDeadlines = await getAidDeadlines()
        setDeadlines(apiDeadlines)
      } catch {
        setError(
          "Unable to load financial-aid deadlines.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    void loadDeadlines()
  }, [])

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    if (!title.trim() || !dueDate) {
      setError("Please enter a title and due date.")
      return
    }

    try {
      setError("")

      const createdDeadline = await addAidDeadline({
        title: title.trim(),
        dueDate,
        status,
      })

      setDeadlines((currentDeadlines) => [
        ...currentDeadlines,
        createdDeadline,
      ])

      setTitle("")
      setDueDate("")
      setStatus("Planned")
      setIsFormOpen(false)
    } catch {
      setError(
        "Unable to add the financial-aid deadline.",
      )
    }
  }

  async function handleDelete(deadlineId: number) {
    try {
      setError("")

      await deleteAidDeadline(deadlineId)

      setDeadlines((currentDeadlines) =>
        currentDeadlines.filter(
          (deadline) => deadline.id !== deadlineId,
        ),
      )
    } catch {
      setError(
        "Unable to delete the financial-aid deadline.",
      )
    }
  }

  async function handleStatusChange(
    deadlineId: number,
    updatedStatus: AidDeadlineStatus,
  ) {
    try {
      setError("")

      const updatedDeadline =
        await updateAidDeadlineStatus(
          deadlineId,
          updatedStatus,
        )

      setDeadlines((currentDeadlines) =>
        currentDeadlines.map((deadline) =>
          deadline.id === deadlineId
            ? updatedDeadline
            : deadline,
        ),
      )
    } catch {
      setError(
        "Unable to update the financial-aid deadline.",
      )
    }
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
          <p className="panel-label">
            Financial aid
          </p>
          <h2>Important deadlines</h2>
        </div>

        <button
          type="button"
          className="panel-button"
          onClick={() => {
            setError("")
            setIsFormOpen(
              (currentValue) => !currentValue,
            )
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
          <label htmlFor="aid-title">
            Deadline title
          </label>

          <input
            id="aid-title"
            type="text"
            placeholder="Example: Grant application"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

          <label htmlFor="aid-date">
            Due date
          </label>

          <input
            id="aid-date"
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(event.target.value)
            }
          />

          <label htmlFor="aid-status">
            Status
          </label>

          <select
            id="aid-status"
            value={status}
            onChange={(event) =>
              setStatus(
                event.target
                  .value as AidDeadlineStatus,
              )
            }
          >
            <option value="Planned">Planned</option>
            <option value="In Progress">
              In Progress
            </option>
            <option value="Submitted">
              Submitted
            </option>
          </select>

          <button
            type="submit"
            className="financial-aid-save-button"
          >
            Save Deadline
          </button>
        </form>
      )}

      {error && (
        <p className="financial-aid-error">
          {error}
        </p>
      )}

      <div className="financial-aid-list">
        {isLoading ? (
          <p className="empty-state">
            Loading financial-aid deadlines...
          </p>
        ) : sortedDeadlines.length === 0 ? (
          <p className="empty-state">
            No financial-aid deadlines have been
            added.
          </p>
        ) : (
          sortedDeadlines.map((deadline) => (
            <div
              className="financial-aid-item"
              key={deadline.id}
            >
              <div>
                <strong>{deadline.title}</strong>
                <span>
                  Due {formatDate(deadline.dueDate)}
                </span>
              </div>

              <div className="financial-aid-actions">
                <select
                  aria-label={`Status for ${deadline.title}`}
                  value={deadline.status}
                  onChange={(event) =>
                    void handleStatusChange(
                      deadline.id,
                      event.target
                        .value as AidDeadlineStatus,
                    )
                  }
                >
                  <option value="Planned">
                    Planned
                  </option>

                  <option value="In Progress">
                    In Progress
                  </option>

                  <option value="Submitted">
                    Submitted
                  </option>
                </select>

                <button
                  type="button"
                  className="delete-deadline-button"
                  onClick={() =>
                    void handleDelete(deadline.id)
                  }
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