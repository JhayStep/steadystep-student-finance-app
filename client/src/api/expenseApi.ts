const API_URL = "http://localhost:3000/api/expenses"

export type Expense = {
  id: number
  description: string
  category: string
  amount: number
  date: string
}

export async function getExpenses(): Promise<Expense[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Failed to fetch expenses.")
  }

  return response.json()
}

export async function addExpense(
  expense: Omit<Expense, "id">,
): Promise<Expense> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  })

  if (!response.ok) {
    throw new Error("Failed to add expense.")
  }

  return response.json()
}

export async function deleteExpense(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete expense.")
  }
}