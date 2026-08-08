# SteadyStep Architecture Decision Record

## ADR-001 — Full-Stack Architecture

### Status

Accepted

### Context

SteadyStep began as a frontend-focused application using React state and browser storage.

As more financial features were added, browser-only storage became limiting because the application needed persistent data and clearer separation between the user interface and database logic.

### Decision

SteadyStep uses the following architecture:

```text
React + TypeScript
        |
        v
Express REST API
        |
        v
Prisma ORM
        |
        v
SQLite