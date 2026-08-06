import { Router } from "express"
import type { Request, Response } from "express"

type Expense = {
  id: number
  description: string
  category: string
  amount: number
  date: string
}

const expenses: Expense[] = [
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
]

const expenseRouter = Router()

expenseRouter.get("/", (_request: Request, response: Response) => {
  response.status(200).json(expenses)
})

expenseRouter.post("/", (request: Request, response: Response) => {
  const { description, category, amount, date } = request.body

  const numericAmount = Number(amount)

  if (
    typeof description !== "string" ||
    !description.trim() ||
    typeof category !== "string" ||
    !category.trim() ||
    !Number.isFinite(numericAmount) ||
    numericAmount <= 0 ||
    typeof date !== "string" ||
    !date
  ) {
    response.status(400).json({
      error:
        "Description, category, positive amount, and date are required.",
    })
    return
  }

  const newExpense: Expense = {
    id: Date.now(),
    description: description.trim(),
    category: category.trim(),
    amount: numericAmount,
    date,
  }

  expenses.push(newExpense)

  response.status(201).json(newExpense)
})

expenseRouter.delete(
  "/:id",
  (request: Request, response: Response) => {
    const expenseId = Number(request.params.id)
    const expenseIndex = expenses.findIndex(
      (expense) => expense.id === expenseId,
    )

    if (expenseIndex === -1) {
      response.status(404).json({
        error: "Expense not found.",
      })
      return
    }

    const [deletedExpense] = expenses.splice(expenseIndex, 1)

    response.status(200).json(deletedExpense)
  },
)

export default expenseRouter