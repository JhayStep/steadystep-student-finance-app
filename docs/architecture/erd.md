# SteadyStep Entity Relationship Diagram

## Current Database Model

The current SteadyStep prototype uses five persistent SQLite entities managed through Prisma:

- Expense
- Budget
- Bill
- SavingsGoal
- AidDeadline

The current prototype is designed around a single-user development environment. Because persistent user accounts have not yet been implemented, the financial entities do not currently contain foreign-key relationships to a User table.

```mermaid
erDiagram

    EXPENSE {
        Int id PK
        String description
        String category
        Float amount
        String date
        DateTime createdAt
    }

    BUDGET {
        Int id PK
        Float amount
        DateTime updatedAt
    }

    BILL {
        Int id PK
        String name
        Float amount
        String dueDate
        DateTime createdAt
    }

    SAVINGS_GOAL {
        Int id PK
        Float saved
        Float target
        DateTime updatedAt
    }

    AID_DEADLINE {
        Int id PK
        String title
        String dueDate
        String status
        DateTime createdAt
    }