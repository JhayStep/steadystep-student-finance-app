const API_URL = "http://localhost:3000/api/bills"

export type Bill = {
  id: number
  name: string
  amount: number
  dueDate: string
}

export async function getBills(): Promise<Bill[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error("Failed to fetch bills.")
  }

  return response.json()
}

export async function addBill(
  bill: Omit<Bill, "id">
): Promise<Bill> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bill),
  })

  if (!response.ok) {
    throw new Error("Failed to add bill.")
  }

  return response.json()
}

export async function deleteBill(
  id: number
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error("Failed to delete bill.")
  }
}