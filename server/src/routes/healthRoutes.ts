import { Router } from "express"

const healthRouter = Router()

healthRouter.get("/", (_request, response) => {
  response.status(200).json({
    status: "ok",
    message: "SteadyStep API is running",
  })
})

export default healthRouter