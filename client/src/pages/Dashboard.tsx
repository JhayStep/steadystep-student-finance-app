import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import AddBillModal from "../components/AddBillModal"
import AddExpenseModal from "../components/AddExpenseModal"
import EditBudgetModal from "../components/EditBudgetModal"
import EditSavingsModal from "../components/EditSavingsModal"
import type { Bill } from "../components/AddBillModal"
import type { Expense } from "../components/AddExpenseModal"
import "./Dashboard.css"

type StoredUser = {
  name?: string
  email: string
}

const startingExpenses: Expense[] = [
  {
    id: 1,
    description: "Rent",
    category: "Housing",
    amount: 400,
    date: "2026-08-01",
  },
  {
    id: 2,
    description: "Groceries",
    category: "Food",
    amount: 82.4,
    date: "2026-08-04",
  },
  {
    id: 3,
    description: "Textbook",
    category: "School",
    amount: 64.99,
    date: "2026-08-02",
  },
  {
    id: 4,
    description: "Bus Pass",
    category: "Transportation",
    amount: 45,
    date: "2026-08-01",
  },
  {
    id: 5,
    description: "Phone Bill",
    category: "Utilities",
    amount: 55,
    date: "2026-07-30",
  },
  {
    id: 6,
    description: "Dining Out",
    category: "Food",
    amount: 112.61,
    date: "2026-07-29",
  },
]

const startingBills: Bill[] = [
  {
    id: 101,
    name: "Phone Bill",
    amount: 55,
    dueDate: "2026-08-08",
  },
  {
    id: 102,
    name: "Rent",
    amount: 650,
    dueDate: "2026-09-01",
  },
  {
    id: 103,
    name: "Streaming",
    amount: 12,
    dueDate: "2026-09-03",
  },
]

function loadExpenses(): Expense[] {
  const savedExpenses = localStorage.getItem("steadystepExpenses")

  if (!savedExpenses) {
    return startingExpenses
  }

  try {
    const parsedExpenses = JSON.parse(savedExpenses)

    return Array.isArray(parsedExpenses)
      ? parsedExpenses
      : startingExpenses
  } catch {
    return startingExpenses
  }
}

function loadBills(): Bill[] {
  const savedBills = localStorage.getItem("steadystepBills")

  if (!savedBills) {
    return startingBills
  }

  try {
    const parsedBills = JSON.parse(savedBills)

    return Array.isArray(parsedBills)
      ? parsedBills
      : startingBills
  } catch {
    return startingBills
  }
}

function loadBudget(): number {
  const savedBudget = localStorage.getItem("steadystepBudget")
  const numericBudget = Number(savedBudget)

  if (
    !savedBudget ||
    !Number.isFinite(numericBudget) ||
    numericBudget <= 0
  ) {
    return 2000
  }

  return numericBudget
}

function loadSavings(): number {
  const savedSavings = localStorage.getItem("steadystepSavings")
  const numericSavings = Number(savedSavings)

  if (
    !savedSavings ||
    !Number.isFinite(numericSavings) ||
    numericSavings < 0
  ) {
    return 650
  }

  return numericSavings
}

function loadSavingsGoal(): number {
  const savedGoal = localStorage.getItem("steadystepSavingsGoal")
  const numericGoal = Number(savedGoal)

  if (
    !savedGoal ||
    !Number.isFinite(numericGoal) ||
    numericGoal <= 0
  ) {
    return 1000
  }

  return numericGoal
}

function Dashboard() {
  const navigate = useNavigate()

  const [expenses, setExpenses] = useState<Expense[]>(loadExpenses)
  const [bills, setBills] = useState<Bill[]>(loadBills)
  const [monthlyBudget, setMonthlyBudget] = useState(loadBudget)
  const [savings, setSavings] = useState(loadSavings)
  const [savingsGoal, setSavingsGoal] = useState(loadSavingsGoal)

  const [isExpenseModalOpen, setIsExpenseModalOpen] =
    useState(false)
  const [isBudgetModalOpen, setIsBudgetModalOpen] =
    useState(false)
  const [isSavingsModalOpen, setIsSavingsModalOpen] =
    useState(false)
  const [isBillModalOpen, setIsBillModalOpen] =
    useState(false)

  const savedUser = localStorage.getItem("steadystepUser")

  let user: StoredUser | null = null

  if (savedUser) {
    try {
      user = JSON.parse(savedUser)
    } catch {
      user = null
    }
  }

  const displayName =
    user?.name || user?.email?.split("@")[0] || "Student"

  const totalSpent = useMemo(
    () =>
      expenses.reduce(
        (total, expense) => total + expense.amount,
        0,
      ),
    [expenses],
  )

  const remainingBudget = monthlyBudget - totalSpent

  const spendingPercentage = Math.min(
    (totalSpent / monthlyBudget) * 100,
    100,
  )

  const savingsPercentage = Math.min(
    (savings / savingsGoal) * 100,
    100,
  )

  const categoryTotals = useMemo(() => {
    return expenses.reduce<Record<string, number>>(
      (totals, expense) => {
        totals[expense.category] =
          (totals[expense.category] || 0) + expense.amount

        return totals
      },
      {},
    )
  }, [expenses])

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort(
      (firstExpense, secondExpense) =>
        new Date(secondExpense.date).getTime() -
        new Date(firstExpense.date).getTime(),
    )
  }, [expenses])

  const sortedBills = useMemo(() => {
    return [...bills].sort(
      (firstBill, secondBill) =>
        new Date(firstBill.dueDate).getTime() -
        new Date(secondBill.dueDate).getTime(),
    )
  }, [bills])

  const currentDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(new Date())

  useEffect(() => {
    localStorage.setItem(
      "steadystepExpenses",
      JSON.stringify(expenses),
    )
  }, [expenses])

  useEffect(() => {
    localStorage.setItem(
      "steadystepBills",
      JSON.stringify(bills),
    )
  }, [bills])

  useEffect(() => {
    localStorage.setItem(
      "steadystepBudget",
      monthlyBudget.toString(),
    )
  }, [monthlyBudget])

  useEffect(() => {
    localStorage.setItem("steadystepSavings", savings.toString())
    localStorage.setItem(
      "steadystepSavingsGoal",
      savingsGoal.toString(),
    )
  }, [savings, savingsGoal])

  function handleAddExpense(expense: Expense) {
    setExpenses((currentExpenses) => [
      expense,
      ...currentExpenses,
    ])
  }

  function handleDeleteExpense(expenseId: number) {
    setExpenses((currentExpenses) =>
      currentExpenses.filter(
        (expense) => expense.id !== expenseId,
      ),
    )
  }

  function handleAddBill(bill: Bill) {
    setBills((currentBills) => [...currentBills, bill])
  }

  function handleDeleteBill(billId: number) {
    setBills((currentBills) =>
      currentBills.filter((bill) => bill.id !== billId),
    )
  }

  function handleSaveBudget(budget: number) {
    setMonthlyBudget(budget)
  }

  function handleSaveSavings(
    updatedSavings: number,
    updatedGoal: number,
  ) {
    setSavings(updatedSavings)
    setSavingsGoal(updatedGoal)
  }

  function handleLogout() {
    localStorage.removeItem("steadystepUser")
    navigate("/")
  }

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(new Date(`${date}T12:00:00`))
  }

  function getBillStatus(dueDate: string) {
    const today = new Date()
    const due = new Date(`${dueDate}T12:00:00`)
    const difference =
      due.getTime() - today.getTime()
    const daysUntilDue = Math.ceil(
      difference / (1000 * 60 * 60 * 24),
    )

    if (daysUntilDue < 0) {
      return "Past due"
    }

    if (daysUntilDue <= 7) {
      return "Due soon"
    }

    return "Upcoming"
  }

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div>
          <p className="sidebar-logo">SteadyStep</p>
          <p className="sidebar-tagline">Student Finance</p>
        </div>

        <nav
          className="sidebar-navigation"
          aria-label="Dashboard navigation"
        >
          <button type="button" className="sidebar-link active">
            Dashboard
          </button>
          <button type="button" className="sidebar-link">
            Expenses
          </button>
          <button type="button" className="sidebar-link">
            Budgets
          </button>
          <button type="button" className="sidebar-link">
            Savings Goals
          </button>
          <button type="button" className="sidebar-link">
            Bills
          </button>
          <button type="button" className="sidebar-link">
            Financial Aid
          </button>
        </nav>

        <div className="sidebar-profile">
          <div className="profile-avatar">
            {displayName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{displayName}</strong>
            <span>College Student</span>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </aside>

      <main className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-date">{currentDate}</p>
            <h1>Welcome back, {displayName}</h1>
            <p className="dashboard-subtitle">
              Here is a quick look at your financial progress this
              month.
            </p>
          </div>

          <div className="dashboard-header-actions">
            <button
              type="button"
              className="edit-budget-button"
              onClick={() => setIsBudgetModalOpen(true)}
            >
              Edit Budget
            </button>

            <button
              type="button"
              className="add-expense-button"
              onClick={() => setIsExpenseModalOpen(true)}
            >
              + Add Expense
            </button>
          </div>
        </header>

        <section className="student-status">
          <div>
            <span>Student status</span>
            <strong>Fall Semester</strong>
          </div>

          <div>
            <span>Financial check-in</span>
            <strong>
              {remainingBudget >= 0 ? "On track" : "Over budget"}
            </strong>
          </div>

          <div>
            <span>Savings status</span>
            <strong>
              {savings >= savingsGoal
                ? "Goal reached"
                : `${savingsPercentage.toFixed(0)}% complete`}
            </strong>
          </div>
        </section>

        <section className="dashboard-summary">
          <article className="dashboard-card">
            <span>Monthly Budget</span>
            <strong>{formatCurrency(monthlyBudget)}</strong>
            <p>Your planned spending limit for this month.</p>
          </article>

          <article className="dashboard-card">
            <span>Total Spent</span>
            <strong>{formatCurrency(totalSpent)}</strong>
            <p>
              You have used {spendingPercentage.toFixed(0)}% of your
              monthly budget.
            </p>
          </article>

          <article
            className={`dashboard-card ${
              remainingBudget >= 0
                ? "highlight-card"
                : "over-budget-card"
            }`}
          >
            <span>Remaining</span>
            <strong>{formatCurrency(remainingBudget)}</strong>
            <p>
              {remainingBudget >= 0
                ? "Available for the rest of the month."
                : "Your spending is currently over budget."}
            </p>
          </article>

          <article className="dashboard-card">
            <span>Savings</span>
            <strong>{formatCurrency(savings)}</strong>
            <p>
              {savings >= savingsGoal
                ? "You reached your savings goal."
                : `${formatCurrency(
                    savingsGoal - savings,
                  )} remaining to reach your goal.`}
            </p>
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-panel expenses-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-label">Recent expenses</p>
                <h2>Latest activity</h2>
              </div>

              <button
                type="button"
                className="panel-button"
                onClick={() => setIsExpenseModalOpen(true)}
              >
                Add Expense
              </button>
            </div>

            <div className="expense-list">
              {sortedExpenses.length === 0 ? (
                <p className="empty-state">
                  No expenses have been recorded yet.
                </p>
              ) : (
                sortedExpenses.map((expense) => (
                  <div className="expense-item" key={expense.id}>
                    <div>
                      <strong>{expense.description}</strong>
                      <span>
                        {expense.category} ·{" "}
                        {formatDate(expense.date)}
                      </span>
                    </div>

                    <div className="expense-actions">
                      <strong>
                        -{formatCurrency(expense.amount)}
                      </strong>

                      <button
                        type="button"
                        className="delete-expense-button"
                        onClick={() =>
                          handleDeleteExpense(expense.id)
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

          <article className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-label">Budget progress</p>
                <h2>Monthly spending</h2>
              </div>

              <button
                type="button"
                className="panel-button"
                onClick={() => setIsBudgetModalOpen(true)}
              >
                Edit
              </button>
            </div>

            <div className="budget-progress-header">
              <strong>{formatCurrency(totalSpent)} spent</strong>
              <span>{formatCurrency(monthlyBudget)} budget</span>
            </div>

            <div className="budget-progress">
              <div
                className="budget-progress-fill"
                style={{ width: `${spendingPercentage}%` }}
              ></div>
            </div>

            <div className="budget-category-list">
              {Object.entries(categoryTotals)
                .sort(
                  ([, firstAmount], [, secondAmount]) =>
                    secondAmount - firstAmount,
                )
                .map(([category, amount]) => (
                  <div key={category}>
                    <span>{category}</span>
                    <strong>{formatCurrency(amount)}</strong>
                  </div>
                ))}
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-label">Savings goal</p>
                <h2>Emergency Fund</h2>
              </div>

              <button
                type="button"
                className="panel-button"
                onClick={() => setIsSavingsModalOpen(true)}
              >
                Update
              </button>
            </div>

            <div className="goal-amounts">
              <strong>{formatCurrency(savings)} saved</strong>
              <span>Goal: {formatCurrency(savingsGoal)}</span>
            </div>

            <div className="goal-progress">
              <div
                className="goal-progress-fill"
                style={{ width: `${savingsPercentage}%` }}
              ></div>
            </div>

            <p className="panel-description">
              {savings >= savingsGoal
                ? "Congratulations! You reached your emergency fund goal."
                : `You are ${savingsPercentage.toFixed(
                    0,
                  )}% of the way toward your emergency fund goal.`}
            </p>

            <button
              type="button"
              className="panel-button full-width-button"
              onClick={() => setIsSavingsModalOpen(true)}
            >
              Add Savings
            </button>
          </article>

          <article className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-label">Upcoming bills</p>
                <h2>Next due dates</h2>
              </div>

              <button
                type="button"
                className="panel-button"
                onClick={() => setIsBillModalOpen(true)}
              >
                Add Bill
              </button>
            </div>

            <div className="bill-list">
              {sortedBills.length === 0 ? (
                <p className="empty-state">
                  No upcoming bills have been added.
                </p>
              ) : (
                sortedBills.map((bill) => (
                  <div className="bill-item" key={bill.id}>
                    <div>
                      <strong>{bill.name}</strong>
                      <span>
                        {formatDate(bill.dueDate)} ·{" "}
                        {formatCurrency(bill.amount)}
                      </span>
                    </div>

                    <div className="bill-actions">
                      <span className="bill-status">
                        {getBillStatus(bill.dueDate)}
                      </span>

                      <button
                        type="button"
                        className="delete-bill-button"
                        onClick={() => handleDeleteBill(bill.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="dashboard-panel financial-aid-panel">
            <p className="panel-label">Financial aid</p>
            <h2>Important deadlines</h2>

            <div className="deadline-card">
              <div>
                <strong>Scholarship application</strong>
                <span>Due September 15</span>
              </div>
              <span className="deadline-status">Upcoming</span>
            </div>

            <div className="deadline-card">
              <div>
                <strong>FAFSA document review</strong>
                <span>Due October 1</span>
              </div>
              <span className="deadline-status">Planned</span>
            </div>
          </article>
        </section>
      </main>

      {isExpenseModalOpen && (
        <AddExpenseModal
          onClose={() => setIsExpenseModalOpen(false)}
          onAddExpense={handleAddExpense}
        />
      )}

      {isBudgetModalOpen && (
        <EditBudgetModal
          currentBudget={monthlyBudget}
          onClose={() => setIsBudgetModalOpen(false)}
          onSaveBudget={handleSaveBudget}
        />
      )}

      {isSavingsModalOpen && (
        <EditSavingsModal
          currentSavings={savings}
          currentGoal={savingsGoal}
          onClose={() => setIsSavingsModalOpen(false)}
          onSave={handleSaveSavings}
        />
      )}

      {isBillModalOpen && (
        <AddBillModal
          onClose={() => setIsBillModalOpen(false)}
          onAddBill={handleAddBill}
        />
      )}
    </div>
  )
}

export default Dashboard