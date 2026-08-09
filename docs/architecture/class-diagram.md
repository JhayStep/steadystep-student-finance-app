# SteadyStep Class Diagram

## Overview

This class diagram represents the primary data entities used by the SteadyStep student finance application. These entities support expense tracking, budgeting, bill reminders, savings goals, and financial aid deadline tracking.

```mermaid
classDiagram

class Expense {
    +Int id
    +String description
    +String category
    +Float amount
    +String date
    +DateTime createdAt
}

class Budget {
    +Int id
    +Float amount
    +DateTime updatedAt
}

class Bill {
    +Int id
    +String name
    +Float amount
    +String dueDate
    +DateTime createdAt
}

class SavingsGoal {
    +Int id
    +Float savedAmount
    +Float targetAmount
    +DateTime updatedAt
}

class AidDeadline {
    +Int id
    +String name
    +String dueDate
    +String description
    +DateTime createdAt
}

class Dashboard {
    +displayExpenses()
    +displayBudget()
    +displayBills()
    +displaySavings()
    +displayAidDeadlines()
}

Dashboard --> Expense : displays
Dashboard --> Budget : displays
Dashboard --> Bill : displays
Dashboard --> SavingsGoal : displays
Dashboard --> AidDeadline : displays
```

## Design Notes

The SteadyStep dashboard acts as the main interface through which the student views financial information. The backend stores each major financial feature as a separate entity. This separation keeps the application organized and allows each feature to be maintained independently.

The class structure corresponds with the entities and functional requirements defined in the SteadyStep SRS.