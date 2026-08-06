import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  addBill as addBillToApi,
  deleteBill as deleteBillFromApi,
  getBills,
} from "../api/billApi"
import type { Bill } from "../api/billApi"

import {
  getBudget,
  updateBudget,
} from "../api/budgetApi"

import {
  addExpense as addExpenseToApi,
  deleteExpense as deleteExpenseFromApi,
  getExpenses,
} from "../api/expenseApi"
import type { Expense } from "../api/expenseApi"

import {
  getSavings,
  updateSavings,
} from "../api/savingsApi"

import AddBillModal from "../components/AddBillModal"
import AddExpenseModal from "../components/AddExpenseModal"
import EditBudgetModal from "../components/EditBudgetModal"
import EditSavingsModal from "../components/EditSavingsModal"
import FinancialAidPanel from "../components/FinancialAidPanel"

import "./Dashboard.css"

type StoredUser = {
  name?: string
  email: string
}

function Dashboard() {
  const navigate = useNavigate()

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [bills, setBills] = useState<Bill[]>([])
  const [monthlyBudget, setMonthlyBudget] = useState(2000)
  const [savings, setSavings] = useState(650)
  const [savingsGoal, setSavingsGoal] = useState(1000)

  const [isLoadingExpenses, setIsLoadingExpenses] =
    useState(true)
  const [expenseError, setExpenseError] = useState("")

  const [isLoadingBills, setIsLoadingBills] =
    useState(true)
  const [billError, setBillError] = useState("")

  const [isLoadingBudget, setIsLoadingBudget] =
    useState(true)
  const [budgetError, setBudgetError] = useState("")

  const [isLoadingSavings, setIsLoadingSavings] =
    useState(true)
  const [savingsError, setSavingsError] = useState("")

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
    user?.name ||
    user?.email?.split("@")[0] ||
    "Student"

  const totalSpent = useMemo(() => {
    return expenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    )
  }, [expenses])

  const remainingBudget = monthlyBudget - totalSpent

  const spendingPercentage =
    monthlyBudget > 0
      ? Math.min(
          (totalSpent / monthlyBudget) * 100,
          100,
        )
      : 0

  const savingsPercentage =
    savingsGoal > 0
      ? Math.min((savings / savingsGoal) * 100, 100)
      : 0

  const categoryTotals = useMemo(() => {
    return expenses.reduce<Record<string, number>>(
      (totals, expense) => {
        totals[expense.category] =
          (totals[expense.category] || 0) +
          expense.amount

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
    async function loadExpensesFromApi() {
      try {
        setIsLoadingExpenses(true)
        setExpenseError("")

        const apiExpenses = await getExpenses()
        setExpenses(apiExpenses)
      } catch {
        setExpenseError(
          "Unable to load expenses from the server.",
        )
      } finally {
        setIsLoadingExpenses(false)
      }
    }

    void loadExpensesFromApi()
  }, [])

  useEffect(() => {
    async function loadBillsFromApi() {
      try {
        setIsLoadingBills(true)
        setBillError("")

        const apiBills = await getBills()
        setBills(apiBills)
      } catch {
        setBillError(
          "Unable to load bills from the server.",
        )
      } finally {
        setIsLoadingBills(false)
      }
    }

    void loadBillsFromApi()
  }, [])

  useEffect(() => {
    async function loadBudgetFromApi() {
      try {
        setIsLoadingBudget(true)
        setBudgetError("")

        const budget = await getBudget()
        setMonthlyBudget(budget.amount)
      } catch {
        setBudgetError(
          "Unable to load the budget from the server.",
        )
      } finally {
        setIsLoadingBudget(false)
      }
    }

    void loadBudgetFromApi()
  }, [])

  useEffect(() => {
    async function loadSavingsFromApi() {
      try {
        setIsLoadingSavings(true)
        setSavingsError("")

        const savingsData = await getSavings()

        setSavings(savingsData.saved)
        setSavingsGoal(savingsData.target)
      } catch {
        setSavingsError(
          "Unable to load savings from the server.",
        )
      } finally {
        setIsLoadingSavings(false)
      }
    }

    void loadSavingsFromApi()
  }, [])

  async function handleAddExpense(expense: Expense) {
    try {
      setExpenseError("")

      const createdExpense = await addExpenseToApi({
        description: expense.description,
        category: expense.category,
        amount: expense.amount,
        date: expense.date,
      })

      setExpenses((currentExpenses) => [
        createdExpense,
        ...currentExpenses,
      ])
    } catch {
      setExpenseError("Unable to add the expense.")
    }
  }

  async function handleDeleteExpense(
    expenseId: number,
  ) {
    try {
      setExpenseError("")

      await deleteExpenseFromApi(expenseId)

      setExpenses((currentExpenses) =>
        currentExpenses.filter(
          (expense) => expense.id !== expenseId,
        ),
      )
    } catch {
      setExpenseError("Unable to delete the expense.")
    }
  }

  async function handleSaveBudget(amount: number) {
    try {
      setBudgetError("")

      const updatedBudget = await updateBudget(amount)
      setMonthlyBudget(updatedBudget.amount)
    } catch {
      setBudgetError("Unable to save the budget.")
    }
  }

  async function handleAddBill(bill: Bill) {
    try {
      setBillError("")

      const createdBill = await addBillToApi({
        name: bill.name,
        amount: bill.amount,
        dueDate: bill.dueDate,
      })

      setBills((currentBills) => [
        ...currentBills,
        createdBill,
      ])
    } catch {
      setBillError("Unable to add the bill.")
    }
  }

  async function handleDeleteBill(billId: number) {
    try {
      setBillError("")

      await deleteBillFromApi(billId)

      setBills((currentBills) =>
        currentBills.filter(
          (bill) => bill.id !== billId,
        ),
      )
    } catch {
      setBillError("Unable to delete the bill.")
    }
  }

  async function handleSaveSavings(
    updatedSavings: number,
    updatedGoal: number,
  ) {
    try {
      setSavingsError("")

      const savingsData = await updateSavings(
        updatedSavings,
        updatedGoal,
      )

      setSavings(savingsData.saved)
      setSavingsGoal(savingsData.target)
    } catch {
      setSavingsError("Unable to update savings.")
    }
  }

  async function handleResetDemoData() {
    try {
      setBudgetError("")
      setSavingsError("")

      const [resetBudget, resetSavings] =
        await Promise.all([
          updateBudget(2000),
          updateSavings(650, 1000),
        ])

      setMonthlyBudget(resetBudget.amount)
      setSavings(resetSavings.saved)
      setSavingsGoal(resetSavings.target)
    } catch {
      setBudgetError(
        "Unable to reset all dashboard information.",
      )
      return
    }

    localStorage.removeItem(
      "steadystepAidDeadlines",
    )

    window.location.reload()
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
          <p className="sidebar-tagline">
            Student Finance
          </p>
        </div>

        <nav
          className="sidebar-navigation"
          aria-label="Dashboard navigation"
        >
          <button
            type="button"
            className="sidebar-link active"
          >
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

        <div className="sidebar-actions">
          <button
            type="button"
            className="reset-demo-button"
            onClick={() =>
              void handleResetDemoData()
            }
          >
            Reset Demo Data
          </button>

          <button
            type="button"
            className="dashboard-logout"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </aside>

      <main className="dashboard-page">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-date">
              {currentDate}
            </p>

            <h1>
              Welcome back, {displayName}
            </h1>

            <p className="dashboard-subtitle">
              Here is a quick look at your financial
              progress this month.
            </p>
          </div>

          <div className="dashboard-header-actions">
            <button
              type="button"
              className="edit-budget-button"
              onClick={() =>
                setIsBudgetModalOpen(true)
              }
              disabled={isLoadingBudget}
            >
              Edit Budget
            </button>

            <button
              type="button"
              className="add-expense-button"
              onClick={() =>
                setIsExpenseModalOpen(true)
              }
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
              {remainingBudget >= 0
                ? "On track"
                : "Over budget"}
            </strong>
          </div>

          <div>
            <span>Savings status</span>
            <strong>
              {isLoadingSavings
                ? "Loading..."
                : savings >= savingsGoal
                  ? "Goal reached"
                  : `${savingsPercentage.toFixed(
                      0,
                    )}% complete`}
            </strong>
          </div>
        </section>

        <section className="dashboard-summary">
          <article className="dashboard-card">
            <span>Monthly Budget</span>

            <strong>
              {isLoadingBudget
                ? "Loading..."
                : formatCurrency(monthlyBudget)}
            </strong>

            {budgetError ? (
              <p className="dashboard-data-error">
                {budgetError}
              </p>
            ) : (
              <p>
                Your planned spending limit for this
                month.
              </p>
            )}
          </article>

          <article className="dashboard-card">
            <span>Total Spent</span>

            <strong>
              {formatCurrency(totalSpent)}
            </strong>

            <p>
              You have used{" "}
              {spendingPercentage.toFixed(0)}% of your
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

            <strong>
              {formatCurrency(remainingBudget)}
            </strong>

            <p>
              {remainingBudget >= 0
                ? "Available for the rest of the month."
                : "Your spending is currently over budget."}
            </p>
          </article>

          <article className="dashboard-card">
            <span>Savings</span>

            <strong>
              {isLoadingSavings
                ? "Loading..."
                : formatCurrency(savings)}
            </strong>

            {savingsError ? (
              <p className="dashboard-data-error">
                {savingsError}
              </p>
            ) : (
              <p>
                {savings >= savingsGoal
                  ? "You reached your savings goal."
                  : `${formatCurrency(
                      savingsGoal - savings,
                    )} remaining to reach your goal.`}
              </p>
            )}
          </article>
        </section>

        <section className="dashboard-grid">
          <article className="dashboard-panel expenses-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-label">
                  Recent expenses
                </p>
                <h2>Latest activity</h2>
              </div>

              <button
                type="button"
                className="panel-button"
                onClick={() =>
                  setIsExpenseModalOpen(true)
                }
              >
                Add Expense
              </button>
            </div>

            <div className="expense-list">
              {isLoadingExpenses ? (
                <p className="empty-state">
                  Loading expenses...
                </p>
              ) : expenseError ? (
                <p className="expense-api-error">
                  {expenseError}
                </p>
              ) : sortedExpenses.length === 0 ? (
                <p className="empty-state">
                  No expenses have been recorded yet.
                </p>
              ) : (
                sortedExpenses.map((expense) => (
                  <div
                    className="expense-item"
                    key={expense.id}
                  >
                    <div>
                      <strong>
                        {expense.description}
                      </strong>
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
                          void handleDeleteExpense(
                            expense.id,
                          )
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
                <p className="panel-label">
                  Budget progress
                </p>
                <h2>Monthly spending</h2>
              </div>

              <button
                type="button"
                className="panel-button"
                onClick={() =>
                  setIsBudgetModalOpen(true)
                }
                disabled={isLoadingBudget}
              >
                Edit
              </button>
            </div>

            <div className="budget-progress-header">
              <strong>
                {formatCurrency(totalSpent)} spent
              </strong>

              <span>
                {isLoadingBudget
                  ? "Loading budget..."
                  : `${formatCurrency(
                      monthlyBudget,
                    )} budget`}
              </span>
            </div>

            <div className="budget-progress">
              <div
                className="budget-progress-fill"
                style={{
                  width: `${spendingPercentage}%`,
                }}
              />
            </div>

            <div className="budget-category-list">
              {Object.entries(categoryTotals)
                .sort(
                  (
                    [, firstAmount],
                    [, secondAmount],
                  ) => secondAmount - firstAmount,
                )
                .map(([category, amount]) => (
                  <div key={category}>
                    <span>{category}</span>
                    <strong>
                      {formatCurrency(amount)}
                    </strong>
                  </div>
                ))}
            </div>
          </article>

          <article className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-label">
                  Savings goal
                </p>
                <h2>Emergency Fund</h2>
              </div>

              <button
                type="button"
                className="panel-button"
                onClick={() =>
                  setIsSavingsModalOpen(true)
                }
                disabled={isLoadingSavings}
              >
                Update
              </button>
            </div>

            {savingsError ? (
              <p className="expense-api-error">
                {savingsError}
              </p>
            ) : (
              <>
                <div className="goal-amounts">
                  <strong>
                    {isLoadingSavings
                      ? "Loading..."
                      : `${formatCurrency(
                          savings,
                        )} saved`}
                  </strong>

                  <span>
                    Goal:{" "}
                    {formatCurrency(savingsGoal)}
                  </span>
                </div>

                <div className="goal-progress">
                  <div
                    className="goal-progress-fill"
                    style={{
                      width: `${savingsPercentage}%`,
                    }}
                  />
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
                  onClick={() =>
                    setIsSavingsModalOpen(true)
                  }
                  disabled={isLoadingSavings}
                >
                  Add Savings
                </button>
              </>
            )}
          </article>

          <article className="dashboard-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-label">
                  Upcoming bills
                </p>
                <h2>Next due dates</h2>
              </div>

              <button
                type="button"
                className="panel-button"
                onClick={() =>
                  setIsBillModalOpen(true)
                }
              >
                Add Bill
              </button>
            </div>

            <div className="bill-list">
              {isLoadingBills ? (
                <p className="empty-state">
                  Loading bills...
                </p>
              ) : billError ? (
                <p className="expense-api-error">
                  {billError}
                </p>
              ) : sortedBills.length === 0 ? (
                <p className="empty-state">
                  No upcoming bills have been added.
                </p>
              ) : (
                sortedBills.map((bill) => (
                  <div
                    className="bill-item"
                    key={bill.id}
                  >
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
                        onClick={() =>
                          void handleDeleteBill(bill.id)
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

          <FinancialAidPanel />
        </section>
      </main>

      {isExpenseModalOpen && (
        <AddExpenseModal
          onClose={() =>
            setIsExpenseModalOpen(false)
          }
          onAddExpense={handleAddExpense}
        />
      )}

      {isBudgetModalOpen && (
        <EditBudgetModal
          currentBudget={monthlyBudget}
          onClose={() =>
            setIsBudgetModalOpen(false)
          }
          onSaveBudget={handleSaveBudget}
        />
      )}

      {isSavingsModalOpen && (
        <EditSavingsModal
          currentSavings={savings}
          currentGoal={savingsGoal}
          onClose={() =>
            setIsSavingsModalOpen(false)
          }
          onSave={handleSaveSavings}
        />
      )}

      {isBillModalOpen && (
        <AddBillModal
          onClose={() =>
            setIsBillModalOpen(false)
          }
          onAddBill={handleAddBill}
        />
      )}
    </div>
  )
}

export default Dashboard