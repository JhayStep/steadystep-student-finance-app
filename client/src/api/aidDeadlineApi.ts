const API_URL =
  "http://localhost:3000/api/aid-deadlines"

export type AidDeadlineStatus =
  | "Planned"
  | "In Progress"
  | "Submitted"

export type AidDeadline = {
  id: number
  title: string
  dueDate: string
  status: AidDeadlineStatus
  createdAt?: string
}

export async function getAidDeadlines(): Promise<
  AidDeadline[]
> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(
      "Failed to fetch financial-aid deadlines.",
    )
  }

  return response.json()
}

export async function addAidDeadline(
  deadline: Omit<AidDeadline, "id" | "createdAt">,
): Promise<AidDeadline> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deadline),
  })

  if (!response.ok) {
    throw new Error(
      "Failed to add the financial-aid deadline.",
    )
  }

  return response.json()
}

export async function updateAidDeadlineStatus(
  id: number,
  status: AidDeadlineStatus,
): Promise<AidDeadline> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error(
      "Failed to update the financial-aid deadline.",
    )
  }

  return response.json()
}

export async function deleteAidDeadline(
  id: number,
): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    throw new Error(
      "Failed to delete the financial-aid deadline.",
    )
  }
}