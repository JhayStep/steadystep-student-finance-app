# SteadyStep Sequence Diagram

## Record an Expense

The following sequence diagram represents the primary flow for UC-01, Record an Expense.

```mermaid
sequenceDiagram
    actor Student
    participant Client as React Client
    participant API as Express API
    participant Prisma as Prisma ORM
    participant DB as SQLite Database

    Student->>Client: Select Add Expense
    Client-->>Student: Display expense form
    Student->>Client: Enter expense information
    Student->>Client: Submit expense
    Client->>API: POST expense data
    API->>API: Validate expense information

    alt Valid expense
        API->>Prisma: Create expense
        Prisma->>DB: Insert expense record
        DB-->>Prisma: Expense stored
        Prisma-->>API: Return expense
        API-->>Client: Return successful response
        Client-->>Student: Display updated expense information
    else Invalid expense
        API-->>Client: Return validation error
        Client-->>Student: Display error message
    end
```

## Sequence Description

The student begins the process by selecting the option to add an expense. The React client collects the expense information and sends it to the Express REST API. The server validates the submitted information before sending valid data through Prisma ORM to the SQLite database.

If the expense is valid, it is stored and returned to the client so the dashboard can reflect the updated financial information. If validation fails, the server returns an error and the expense is not stored.

This sequence corresponds with UC-01 and the FR-EXP requirements documented in the SteadyStep SRS.