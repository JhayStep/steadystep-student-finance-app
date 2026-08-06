import { Router } from "express"
import type { Request, Response } from "express"
import prisma from "../lib/prisma.js"

const billRouter = Router()

billRouter.get(
  "/",
  async (_request: Request, response: Response) => {
    try {
      const bills = await prisma.bill.findMany({
        orderBy: {
          dueDate: "asc",
        },
      })

      response.status(200).json(bills)
    } catch (error) {
      console.error("Unable to retrieve bills:", error)

      response.status(500).json({
        error: "Unable to retrieve bills.",
      })
    }
  },
)

billRouter.post(
  "/",
  async (request: Request, response: Response) => {
    const { name, amount, dueDate } = request.body

    const numericAmount = Number(amount)

    if (
      typeof name !== "string" ||
      !name.trim() ||
      !Number.isFinite(numericAmount) ||
      numericAmount <= 0 ||
      typeof dueDate !== "string" ||
      !dueDate.trim()
    ) {
      response.status(400).json({
        error:
          "Bill name, positive amount, and due date are required.",
      })
      return
    }

    try {
      const newBill = await prisma.bill.create({
        data: {
          name: name.trim(),
          amount: numericAmount,
          dueDate: dueDate.trim(),
        },
      })

      response.status(201).json(newBill)
    } catch (error) {
      console.error("Unable to create bill:", error)

      response.status(500).json({
        error: "Unable to create the bill.",
      })
    }
  },
)

billRouter.delete(
  "/:id",
  async (request: Request, response: Response) => {
    const billId = Number(request.params.id)

    if (!Number.isInteger(billId) || billId <= 0) {
      response.status(400).json({
        error: "A valid bill ID is required.",
      })
      return
    }

    try {
      const deletedBill = await prisma.bill.delete({
        where: {
          id: billId,
        },
      })

      response.status(200).json(deletedBill)
    } catch (error) {
      console.error("Unable to delete bill:", error)

      response.status(404).json({
        error: "Bill not found.",
      })
    }
  },
)

export default billRouter