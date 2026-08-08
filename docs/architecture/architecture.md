# SteadyStep System Architecture

## Architecture Overview

SteadyStep uses a layered full-stack architecture that separates the user interface, API, data-access layer, and persistent database.

The current application architecture is:

```mermaid
flowchart TD

    User["Student User"]

    Client["React + TypeScript Client"]

    API["Express REST API"]

    ExpenseRoute["Expense Routes"]
    BudgetRoute["Budget Routes"]
    BillRoute["Bill Routes"]
    SavingsRoute["Savings Routes"]
    AidRoute["Financial Aid Routes"]

    Prisma["Prisma ORM"]

    Database["SQLite Database"]

    User --> Client
    Client -->|HTTP Requests| API

    API --> ExpenseRoute
    API --> BudgetRoute
    API --> BillRoute
    API --> SavingsRoute
    API --> AidRoute

    ExpenseRoute --> Prisma
    BudgetRoute --> Prisma
    BillRoute --> Prisma
    SavingsRoute --> Prisma
    AidRoute --> Prisma

    Prisma --> Database