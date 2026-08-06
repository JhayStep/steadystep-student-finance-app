import { Router } from "express"
import type { Request, Response } from "express"
import prisma from "../lib/prisma.js"

const aidDeadlineRouter = Router()

const validStatuses = [
  "Planned",
  "In Progress",
  "Submitted",
] as const

function isValidStatus(status: unknown): status is string {
  return (
    typeof status === "string" &&
    validStatuses.includes(
      status as (typeof validStatuses)[number],
    )
  )
}

aidDeadlineRouter.get(
  "/",
  async (_request: Request, response: Response) => {
    try {
      const deadlines = await prisma.aidDeadline.findMany({
        orderBy: {
          dueDate: "asc",
        },
      })

      response.status(200).json(deadlines)
    } catch (error) {
      console.error(
        "Unable to retrieve financial-aid deadlines:",
        error,
      )

      response.status(500).json({
        error:
          "Unable to retrieve financial-aid deadlines.",
      })
    }
  },
)

aidDeadlineRouter.post(
  "/",
  async (request: Request, response: Response) => {
    const { title, dueDate, status } = request.body

    if (
      typeof title !== "string" ||
      !title.trim() ||
      typeof dueDate !== "string" ||
      !dueDate.trim() ||
      !isValidStatus(status)
    ) {
      response.status(400).json({
        error:
          "Title, due date, and a valid status are required.",
      })
      return
    }

    try {
      const newDeadline =
        await prisma.aidDeadline.create({
          data: {
            title: title.trim(),
            dueDate: dueDate.trim(),
            status,
          },
        })

      response.status(201).json(newDeadline)
    } catch (error) {
      console.error(
        "Unable to create financial-aid deadline:",
        error,
      )

      response.status(500).json({
        error:
          "Unable to create the financial-aid deadline.",
      })
    }
  },
)

aidDeadlineRouter.put(
  "/:id",
  async (request: Request, response: Response) => {
    const deadlineId = Number(request.params.id)
    const { status } = request.body

    if (
      !Number.isInteger(deadlineId) ||
      deadlineId <= 0
    ) {
      response.status(400).json({
        error: "A valid deadline ID is required.",
      })
      return
    }

    if (!isValidStatus(status)) {
      response.status(400).json({
        error: "A valid deadline status is required.",
      })
      return
    }

    try {
      const updatedDeadline =
        await prisma.aidDeadline.update({
          where: {
            id: deadlineId,
          },
          data: {
            status,
          },
        })

      response.status(200).json(updatedDeadline)
    } catch (error) {
      console.error(
        "Unable to update financial-aid deadline:",
        error,
      )

      response.status(404).json({
        error: "Financial-aid deadline not found.",
      })
    }
  },
)

aidDeadlineRouter.delete(
  "/:id",
  async (request: Request, response: Response) => {
    const deadlineId = Number(request.params.id)

    if (
      !Number.isInteger(deadlineId) ||
      deadlineId <= 0
    ) {
      response.status(400).json({
        error: "A valid deadline ID is required.",
      })
      return
    }

    try {
      const deletedDeadline =
        await prisma.aidDeadline.delete({
          where: {
            id: deadlineId,
          },
        })

      response.status(200).json(deletedDeadline)
    } catch (error) {
      console.error(
        "Unable to delete financial-aid deadline:",
        error,
      )

      response.status(404).json({
        error: "Financial-aid deadline not found.",
      })
    }
  },
)

export default aidDeadlineRouter