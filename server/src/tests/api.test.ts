import request from "supertest"
import { describe, expect, it } from "vitest"

import app from "../app.js"

describe("SteadyStep API integration tests", () => {
  it("TEST-API-01 health endpoint responds successfully", async () => {
    const response = await request(app).get("/api/health")

    expect(response.status).toBe(200)
  })

  it("TEST-EXP-03 retrieves stored expenses", async () => {
    const response = await request(app).get("/api/expenses")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("TEST-EXP-04 rejects an invalid expense", async () => {
    const response = await request(app)
      .post("/api/expenses")
      .send({
        description: "",
        category: "",
        amount: -10,
        date: "",
      })

    expect(response.status).toBe(400)
  })

  it("TEST-BUD-02 retrieves the current budget", async () => {
    const response = await request(app).get("/api/budget")

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("amount")
  })

  it("TEST-BUD-03 rejects an invalid budget", async () => {
    const response = await request(app)
      .put("/api/budget")
      .send({
        amount: -500,
      })

    expect(response.status).toBe(400)
  })

  it("TEST-BILL-02 retrieves stored bills", async () => {
    const response = await request(app).get("/api/bills")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("TEST-BILL-03 rejects an invalid bill", async () => {
    const response = await request(app)
      .post("/api/bills")
      .send({
        name: "",
        amount: -50,
        dueDate: "",
      })

    expect(response.status).toBe(400)
  })

  it("TEST-SAV-02 retrieves savings information", async () => {
    const response = await request(app).get("/api/savings")

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("saved")
    expect(response.body).toHaveProperty("target")
  })

  it("TEST-AID-02 retrieves financial aid deadlines", async () => {
    const response = await request(app).get("/api/aid-deadlines")

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  })

  it("TEST-API-02 returns 404 for an unknown route", async () => {
    const response = await request(app).get("/api/not-a-real-route")

    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      error: "Route not found",
    })
  })
})