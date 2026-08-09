# SteadyStep — Student Finance App

SteadyStep is a student financial survival application designed to help college students better manage financial stress while balancing school, work, and personal responsibilities.

Many students struggle with budgeting, tracking everyday expenses, remembering bill deadlines, building savings, and organizing financial aid information. SteadyStep brings these responsibilities into one application designed around the financial needs of college students.

## Core Features

SteadyStep currently supports:

- Expense tracking with amount, category, description, and date
- Budget management and remaining-budget calculations
- Bill reminders and due-date tracking
- Savings goal tracking
- Financial aid deadline tracking
- Financial dashboard summaries
- Persistent financial data storage

## Technology Stack

### Frontend

- React
- TypeScript
- Vite

### Backend

- Node.js
- Express
- TypeScript

### Database

- SQLite
- Prisma ORM

### Testing and CI

- Vitest
- Supertest
- V8 code coverage
- GitHub Actions

## System Architecture

SteadyStep uses a layered full-stack architecture:

```text
Student
   |
   v
React + TypeScript Client
   |
   v
Express REST API
   |
   v
Prisma ORM
   |
   v
SQLite Database
```

Additional architecture documentation is located in:

```text
docs/architecture/
```

This includes the:

- Architecture overview
- Architecture Decision Record (ADR)
- Entity Relationship Diagram (ERD)
- Class diagram
- Sequence diagram

## Repository Structure

```text
steadystep-student-finance-app/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── client/
│   └── React + TypeScript frontend
│
├── docs/
│   ├── SRS.md
│   └── architecture/
│
├── server/
│   ├── prisma/
│   └── src/
│
└── README.md
```

## Prerequisites

Before running SteadyStep locally, install:

- Node.js
- npm
- Git

## Installation

Clone the repository and enter the project directory.

```bash
git clone https://github.com/JhayStep/steadystep-student-finance-app.git
cd steadystep-student-finance-app
```

### Server Setup

Move into the server directory:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory.

Add:

```env
DATABASE_URL="file:./prisma/dev.db"
```

Generate the Prisma client:

```bash
npx prisma generate
```

Initialize/synchronize the local database:

```bash
npx prisma db push
```

Start the server:

```bash
npm run dev
```

### Client Setup

Open a second terminal from the project root and move into the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Use the local URL displayed by Vite to open SteadyStep in a browser.

## Testing

Automated server tests are located in:

```text
server/src/tests/
```

From the `server` directory, run:

```bash
npm test
```

The current automated suite contains validation and API integration tests for SteadyStep's core server functionality.

## Code Coverage

Generate the server coverage report with:

```bash
npm run coverage
```

The coverage report measures automated test execution across the server code.

The current test suite prioritizes core financial functionality, API behavior, and input validation. Coverage should not be interpreted as verification of every possible branch or error condition.

## Build Verification

Build the server with:

```bash
cd server
npm run build
```

Build the client with:

```bash
cd client
npm run build
```

## Continuous Integration

SteadyStep uses GitHub Actions for Continuous Integration.

The workflow is located at:

```text
.github/workflows/ci.yml
```

For pushes and pull requests to `main`, CI verifies the project by:

- Installing dependencies
- Generating the Prisma client
- Creating the CI database structure
- Running automated server tests
- Building the server
- Building the React client

The final project should have a green CI workflow before submission.

## Software Requirements Specification

The complete Software Requirements Specification is located at:

```text
docs/SRS.md
```

The SRS documents:

- Product scope
- User characteristics
- Features
- Use cases
- Functional requirements
- Nonfunctional requirements
- Security considerations
- Data requirements
- Architecture and design
- Verification and validation
- Requirements traceability

## Current Prototype Scope

SteadyStep is currently an academic prototype designed around a solo student user.

The current implementation focuses on completing and verifying the core student-finance workflows rather than providing production-scale account management.

Production-grade authentication, per-user authorization, cloud deployment, and migration to a hosted production database remain future development opportunities.

## Future Development

Future versions of SteadyStep could include:

- Secure student account authentication
- User-specific financial records
- Expanded spending analytics
- Additional dashboard visualizations
- Improved responsive/mobile design
- Notification support for upcoming bills and deadlines
- Hosted relational database deployment
- Cloud deployment
- Expanded automated test coverage

## Project Documentation

Additional documentation can be found in the `docs/` directory.

SteadyStep was developed as a software engineering project with emphasis on iterative development, requirements traceability, architecture, testing, security awareness, and continuous integration.