const API_URL = "http://localhost:3000/api/savings"

export type SavingsGoal = {
  id: number
  saved: number
  target: number
  updatedAt: string
}

export async function getSavings(): Promise<SavingsGoal> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Failed to fetch savings information.")
  }

  return response.json()
}

export async function updateSavings(
  saved: number,
  target: number,
): Promise<SavingsGoal> {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      saved,
      target,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to update savings information.")
  }

  return response.json()
}