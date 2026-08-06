import { Router } from "express";
import prisma from "../lib/prisma.js";
const savingsRouter = Router();
savingsRouter.get("/", async (_request, response) => {
    try {
        const savingsGoal = await prisma.savingsGoal.upsert({
            where: {
                id: 1,
            },
            update: {},
            create: {
                id: 1,
                saved: 650,
                target: 1000,
            },
        });
        response.status(200).json(savingsGoal);
    }
    catch (error) {
        console.error("Unable to retrieve savings:", error);
        response.status(500).json({
            error: "Unable to retrieve savings information.",
        });
    }
});
savingsRouter.put("/", async (request, response) => {
    const numericSaved = Number(request.body.saved);
    const numericTarget = Number(request.body.target);
    if (!Number.isFinite(numericSaved) ||
        numericSaved < 0 ||
        !Number.isFinite(numericTarget) ||
        numericTarget <= 0) {
        response.status(400).json({
            error: "Saved amount cannot be negative and the target must be greater than zero.",
        });
        return;
    }
    try {
        const savingsGoal = await prisma.savingsGoal.upsert({
            where: {
                id: 1,
            },
            update: {
                saved: numericSaved,
                target: numericTarget,
            },
            create: {
                id: 1,
                saved: numericSaved,
                target: numericTarget,
            },
        });
        response.status(200).json(savingsGoal);
    }
    catch (error) {
        console.error("Unable to update savings:", error);
        response.status(500).json({
            error: "Unable to update savings information.",
        });
    }
});
export default savingsRouter;
