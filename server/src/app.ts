import cors from "cors"
import dotenv from "dotenv"
import express from "express"

import aidDeadlineRouter from "./routes/aidDeadlineRoutes.js"
import billRouter from "./routes/billRoutes.js"
import budgetRouter from "./routes/budgetRoutes.js"
import expenseRouter from "./routes/expenseRoutes.js"
import healthRouter from "./routes/healthRoutes.js"
import savingsRouter from "./routes/savingsRoutes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/health", healthRouter)
app.use("/api/expenses", expenseRouter)
app.use("/api/budget", budgetRouter)
app.use("/api/bills", billRouter)
app.use("/api/savings", savingsRouter)
app.use("/api/aid-deadlines", aidDeadlineRouter)

app.use((_request, response) => {
  response.status(404).json({
    error: "Route not found",
  })
})

export default app

if (process.env.NODE_ENV !== "test") {
  const port = Number(process.env.PORT) || 3000

  app.listen(port, () => {
    console.log(`SteadyStep API running at http://localhost:${port}`)
  })
}