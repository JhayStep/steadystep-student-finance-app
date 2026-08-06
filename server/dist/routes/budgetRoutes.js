import { Router } from "express";
import prisma from "../lib/prisma.js";
const budgetRouter = Router();
budgetRouter.get("/", async (_request, response) => {
    try {
        const budget = await prisma.budget.upsert({
            where: {
                id: 1,
            },
            update: {},
            create: {
                id: 1,
                amount: 2000,
            },
        });
        response.status(200).json(budget);
    }
    catch {
        response.status(500).json({
            error: "Unable to retrieve the budget.",
        });
    }
});
budgetRouter.put("/", async (request, response) => {
    const numericAmount = Number(request.body.amount);
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        response.status(400).json({
            error: "Budget amount must be greater than zero.",
        });
        return;
    }
    try {
        const budget = await prisma.budget.upsert({
            where: {
                id: 1,
            },
            update: {
                amount: numericAmount,
            },
            create: {
                id: 1,
                amount: numericAmount,
            },
        });
        response.status(200).json(budget);
    }
    catch {
        response.status(500).json({
            error: "Unable to save the budget.",
        });
    }
});
export default budgetRouter;
