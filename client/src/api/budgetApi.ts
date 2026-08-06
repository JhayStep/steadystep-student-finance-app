const API_URL = "http://localhost:3000/api/budget"

export type Budget = {
  id: number
  amount: number
  updatedAt: string
}

export async function getBudget(): Promise<Budget> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Failed to fetch the budget.")
  }

  return response.json()
}

export async function updateBudget(
  amount: number,
): Promise<Budget> {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount }),
  })

  if (!response.ok) {
    throw new Error("Failed to update the budget.")
  }

  return response.json()
}