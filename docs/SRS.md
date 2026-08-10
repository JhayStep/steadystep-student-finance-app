# SteadyStep — Software Requirements Specification

**Project:** SteadyStep Student Finance Application  
**Developer:** Jhaydn Steplight  
**Course:** CSC 446 — Software Engineering, Analysis, and Lab  
**Project Type:** Solo Software Engineering Project  
**Technology Stack:** React, TypeScript, Express, Prisma, SQLite  

---

# 1. Introduction

## 1.1 Purpose

This Software Requirements Specification (SRS) documents the requirements, architecture, features, testing strategy, security considerations, and design decisions for SteadyStep.

SteadyStep is a student-focused personal finance application designed to give college students a simple place to organize important financial information. The application focuses on budgeting, expense tracking, savings, bill management, and other financial responsibilities that students commonly manage while attending college.

This document represents the final state of the project while also documenting important changes that occurred during the Agile development process.

## 1.2 Product Scope

College students often manage several financial responsibilities at the same time, including rent, food, transportation, textbooks, recurring bills, savings goals, and other school-related expenses. Financial information can become difficult to manage when it is spread between banking applications, notes, spreadsheets, and other tools.

SteadyStep was created to provide students with a centralized financial dashboard where important financial information can be viewed and managed.

The application allows a student to:

- Create and maintain a monthly budget.
- Record and review expenses.
- Monitor remaining budget amounts.
- Maintain a savings goal.
- Create and view upcoming bill reminders.
- Organize important financial information through one dashboard.
- Track financial-aid-related deadlines.

The goal of SteadyStep is not to replace a bank or professional financial planning service. Instead, it provides students with an accessible organizational tool that helps them understand their current financial position and upcoming responsibilities.

## 1.3 Intended Audience

This document is intended for:

- The course instructor evaluating the completed software project.
- Developers who may maintain or expand SteadyStep.
- Testers verifying that the implemented system satisfies its requirements.
- Individuals who want to understand the design and architecture of the application.

The document is written so that someone who did not participate in the development of SteadyStep can understand the purpose, requirements, architecture, and verification strategy of the system.

## 1.4 Definitions and Technologies

**SRS** — Software Requirements Specification.

**UI** — User Interface.

**API** — Application Programming Interface.

**CRUD** — Create, Read, Update, and Delete operations.

**React** — Front-end library used to construct the SteadyStep user interface.

**TypeScript** — Statically typed programming language used throughout the application to improve code reliability and maintainability.

**Express** — Server-side framework used to provide SteadyStep's API endpoints.

**Prisma** — Database toolkit used by the server to communicate with the application database.

**SQLite** — Relational database used for persistent development data storage.

**Must-have Feature** — A feature required for the minimum functional version of SteadyStep.

**Should/Could Feature** — A feature that extends the core application but is not necessary for the minimum functional product.

---

# 2. Overall Description

## 2.1 Product Perspective

SteadyStep is a full-stack web application developed as a solo software engineering project.

The application follows a layered architecture:

**User → React/TypeScript Client → Express API → Prisma → SQLite Database**

The React client provides the interface used to interact with the application. User actions requiring persistent data are sent to the Express backend through API requests. The backend validates and processes the request before Prisma performs the appropriate database operation against SQLite.

Separating the client, API, database-access layer, and database makes the application easier to maintain and allows individual parts of the system to evolve without requiring the entire application to be rewritten.

## 2.2 Product Features

SteadyStep is organized around the following product features.

### Feature: Expense Tracking

Students can record expenses containing financial information such as a description, category, amount, and date. Existing expenses can be retrieved and displayed by the application.

Expense tracking provides the underlying spending data used by other parts of the financial dashboard.

### Feature: Budget Management and Summary

Students can maintain a monthly budget and compare that budget against recorded spending.

The dashboard displays financial information that allows the student to understand how much has been spent and how much of the budget remains.

### Feature: Bill Reminders

Students can create bill reminders containing information such as the bill name, amount, and due date.

Upcoming bills are displayed through the application so students can keep track of financial responsibilities before they are due.

### Feature: Savings Goal Tracking

Students can maintain savings information including the amount currently saved and a target amount.

This feature gives students a simple visual reference for progress toward a financial goal.

### Feature: Financial Aid Deadline Tracking

SteadyStep includes support for organizing financial-aid-related deadlines.

This feature extends the application's original budgeting focus by recognizing that student finances can include deadlines and responsibilities that are specific to attending college.

## 2.3 Target Users

The primary users of SteadyStep are college students who want a straightforward way to organize their personal finances.

A typical user may need to manage:

- Rent or housing expenses.
- Food and grocery spending.
- Transportation expenses.
- Textbooks and school supplies.
- Monthly bills.
- Savings goals.
- Financial aid responsibilities.
- A limited monthly budget.

The application is designed to make these responsibilities easier to understand without requiring advanced financial knowledge.

## 2.4 Operating Environment

SteadyStep is designed as a web application.

The development implementation consists of:

- A modern web browser for the user interface.
- React and TypeScript for the client application.
- Node.js and Express for server-side functionality.
- Prisma for database access.
- SQLite for persistent storage.
- Git and GitHub for source control and project management.

During local development, the client and API server run as separate processes and communicate through HTTP requests.

## 2.5 Design and Implementation Constraints

SteadyStep was developed under several project constraints.

### Solo Development

The application was developed as a solo project. Design, implementation, testing, documentation, and project management responsibilities were therefore handled by one developer.

### Academic Development Schedule

Development occurred incrementally across course sprints. Features were prioritized according to project requirements, available sprint time, and their importance to the core student-finance problem.

### Technology Stack

The final implementation uses React, TypeScript, Express, Prisma, and SQLite. Architectural and implementation decisions documented later in this SRS reflect this stack.

### Local Development

The current application is designed primarily for local execution rather than production cloud deployment. Production deployment, large-scale database hosting, and infrastructure scaling remain possible future extensions.

## 2.6 Assumptions and Dependencies

SteadyStep assumes:

- The user has access to a modern web browser.
- The application server is running and accessible to the client.
- The database is available to the backend.
- Financial information entered by the user is accurate.
- The user is responsible for maintaining the accuracy of personal financial entries.

The application depends on its Node.js packages and supporting libraries, including React, Express, Prisma, and the SQLite database integration.

## 2.7 Agile Evolution of the Product

SteadyStep changed throughout development as features moved from planning into implementation.

The original project direction concentrated primarily on student budgeting and expense organization. As development progressed, the application evolved into a broader student finance dashboard.

Expense tracking and budget management remained central to the product because spending data and budget awareness form the foundation of the application. Later development expanded the system with savings tracking, bill reminders, and financial aid deadline functionality.

The project also evolved technically. Moving from interface-focused development to persistent full-stack functionality required integration between the React client, Express API, Prisma, and SQLite database. This affected several implementation decisions and required the architecture and documentation to be updated to reflect the actual completed system.

Features that were not necessary for the minimum functional product were given lower priority than ensuring that the core financial workflows operated reliably end-to-end.

These changes reflect the Agile nature of the project: requirements and implementation details were refined as development, testing, and integration provided additional information about the needs of the system.
---

# 3. Use Cases

## 3.1 Use Case Overview

The following use cases describe the primary ways a student interacts with SteadyStep. Each use case connects to one or more functional requirements in Section 4.

The primary actor for the current implementation is the **Student User**.

---

## 3.2 UC-01 — Record an Expense

**Related Feature:** Expense Tracking

**Primary Actor:** Student User

**Goal:** Record a financial expense so that the student's spending can be tracked by SteadyStep.

**Preconditions:**
- The SteadyStep client is running.
- The API server is available.
- The database is accessible.

**Trigger:**  
The student chooses to add an expense.

**Main Flow:**

1. The student selects the option to add an expense.
2. SteadyStep displays the expense-entry interface.
3. The student enters the expense information.
4. The student submits the expense.
5. The client sends the expense information to the Express API.
6. The server validates the submitted information.
7. Prisma stores the valid expense in the SQLite database.
8. The updated expense information is returned to the client.
9. The dashboard reflects the newly recorded expense.

**Alternative/Error Flow:**

- If required expense information is invalid or missing, the request is rejected.
- If the server or database cannot process the request, the application reports that the operation could not be completed.

**Postconditions:**

- A valid expense is persisted in the database.
- The expense is available for later retrieval.
- Dashboard spending information can reflect the new expense.

---

## 3.3 UC-02 — View Budget Summary

**Related Feature:** Budget Management and Summary

**Primary Actor:** Student User

**Goal:** Understand current spending relative to the student's budget.

**Preconditions:**

- SteadyStep is running.
- Budget and expense information can be retrieved from the backend.

**Trigger:**  
The student views the financial dashboard.

**Main Flow:**

1. The student opens the dashboard.
2. The client requests budget information.
3. The client requests recorded expense information.
4. The backend retrieves the required persistent data.
5. SteadyStep calculates or displays the relevant financial totals.
6. The student sees the current budget, spending, and remaining financial information.

**Alternative/Error Flow:**

- If financial data cannot be retrieved, the application displays an appropriate failure state rather than presenting unavailable data as valid information.

**Postconditions:**

- The student can evaluate current spending relative to the established budget.

---

## 3.4 UC-03 — Update a Budget

**Related Feature:** Budget Management and Summary

**Primary Actor:** Student User

**Goal:** Change the monthly budget used by the financial dashboard.

**Preconditions:**

- SteadyStep is running.
- The backend and database are available.

**Trigger:**  
The student chooses to edit the budget.

**Main Flow:**

1. The student selects the budget editing option.
2. SteadyStep displays the budget editing interface.
3. The student enters a new budget amount.
4. The student submits the change.
5. The client sends the updated value to the API.
6. The server validates the value.
7. Prisma updates the stored budget.
8. The new budget is returned to the client.
9. The dashboard reflects the updated budget.

**Alternative/Error Flow:**

- Invalid budget values are rejected.
- Database or server failures result in an error response rather than an incorrect update.

**Postconditions:**

- The valid budget amount is persisted.
- The dashboard can use the updated amount.

---

## 3.5 UC-04 — Create a Bill Reminder

**Related Feature:** Bill Reminders

**Primary Actor:** Student User

**Goal:** Record an upcoming bill so that the student can keep track of its amount and due date.

**Preconditions:**

- SteadyStep is running.
- The API and database are available.

**Trigger:**  
The student selects the option to add a bill.

**Main Flow:**

1. The student selects Add Bill.
2. SteadyStep displays the bill-entry interface.
3. The student enters the bill information.
4. The student submits the bill.
5. The client sends the information to the API.
6. The server validates the bill information.
7. Prisma stores the bill.
8. The saved bill is returned to the client.
9. The dashboard displays the upcoming bill information.

**Alternative/Error Flow:**

- Missing or invalid bill information is rejected.
- A server or database failure produces an error response.

**Postconditions:**

- The valid bill reminder is stored persistently.
- The reminder can be retrieved and displayed later.

---

## 3.6 UC-05 — Update Savings Progress

**Related Feature:** Savings Goal Tracking

**Primary Actor:** Student User

**Goal:** Maintain a current savings amount and target so that progress toward a financial goal can be monitored.

**Preconditions:**

- SteadyStep is running.
- Savings information is accessible through the API.

**Trigger:**  
The student chooses to update savings information.

**Main Flow:**

1. The student selects the savings update option.
2. SteadyStep displays the savings editing interface.
3. The student enters updated savings information.
4. The student submits the change.
5. The client sends the information to the backend.
6. The backend validates the submitted values.
7. Prisma persists the updated savings information.
8. The client receives the updated information.
9. SteadyStep displays the student's current savings progress.

**Alternative/Error Flow:**

- Invalid savings values are rejected.
- Server or database failures are communicated to the client.

**Postconditions:**

- Valid savings information is stored persistently.
- The dashboard reflects the updated savings information.

---

## 3.7 UC-06 — Manage Financial Aid Deadlines

**Related Feature:** Financial Aid Deadline Tracking

**Primary Actor:** Student User

**Goal:** Keep important financial-aid-related deadlines organized within the student finance application.

**Preconditions:**

- SteadyStep is running.
- The financial aid deadline API and database are available.

**Trigger:**  
The student accesses the financial aid deadline functionality.

**Main Flow:**

1. The student accesses financial aid deadline information.
2. The application retrieves existing deadline information.
3. The student may add or modify deadline information.
4. The client sends the requested change to the backend.
5. The backend validates the request.
6. Prisma performs the appropriate database operation.
7. Updated deadline information is returned to the application.

**Alternative/Error Flow:**

- Invalid deadline information is rejected.
- A requested deadline that does not exist cannot be updated or deleted.
- Server/database failures return an appropriate error response.

**Postconditions:**

- Valid changes are persisted.
- Current financial aid deadline information remains available to the student.

---

# 4. Functional Requirements

## 4.1 Requirement Conventions

Functional requirements use the identifier format:

**FR-[Feature]-[Number]**

Each requirement uses the word **shall** to identify behavior expected from the implemented system.

Requirements are grouped by product feature so that they can be traced from the feature list in Section 2.2 to the use cases in Section 3 and eventually to verification tests in Section 8.

---

## 4.2 Must-Have Requirements

The minimum functional SteadyStep product is centered around the ability to record spending, maintain a budget, and provide useful financial organization through the dashboard.

The core implementation prioritizes:

1. Expense tracking.
2. Budget management and summary.
3. Bill reminder functionality.

Additional implemented functionality extends the application beyond these minimum workflows.

---

## 4.3 Input and Validation Requirements

**FR-VAL-01:** The system shall reject financial entries that fail required server-side validation.

**FR-VAL-02:** The system shall convert submitted financial amounts into appropriate numeric values before persistence.

**FR-VAL-03:** The system shall prevent invalid requests from being treated as successfully stored financial data.

**FR-VAL-04:** The server shall return an appropriate error response when an operation cannot be completed.

---

## 4.4 Data Persistence Requirements

**FR-DATA-01:** SteadyStep shall persist supported financial information using the application's database layer.

**FR-DATA-02:** The Express backend shall use Prisma to perform supported persistent-data operations.

**FR-DATA-03:** Persisted information shall remain available after the client interface is refreshed, provided the underlying database has not been reset.

**FR-DATA-04:** The client shall obtain persistent financial information through backend API endpoints rather than directly accessing the database.

---

## 4.5 Feature Requirements

### Feature: Expense Tracking

**Related Use Case:** UC-01

**FR-EXP-01:** The system shall allow a student to submit a new expense.

**FR-EXP-02:** An expense shall support a description, category, amount, and date.

**FR-EXP-03:** The backend shall validate submitted expense information before persistence.

**FR-EXP-04:** A valid submitted expense shall be stored in the database.

**FR-EXP-05:** The system shall retrieve stored expenses for display in the client application.

**FR-EXP-06:** The system shall support deletion of an existing expense when requested through the supported expense workflow.

---

### Feature: Budget Management and Summary

**Related Use Cases:** UC-02, UC-03

**FR-BUD-01:** The system shall retrieve the currently stored budget.

**FR-BUD-02:** The system shall allow the student to update the budget amount.

**FR-BUD-03:** The backend shall validate a submitted budget before storing it.

**FR-BUD-04:** A valid budget update shall persist in the database.

**FR-BUD-05:** The dashboard shall display spending information using persisted expense data.

**FR-BUD-06:** The dashboard shall provide the student with information showing spending relative to the current budget.

---

### Feature: Bill Reminders

**Related Use Case:** UC-04

**FR-BILL-01:** The system shall allow the student to create a bill reminder.

**FR-BILL-02:** A bill reminder shall contain a name, amount, and due date.

**FR-BILL-03:** The backend shall validate submitted bill information before persistence.

**FR-BILL-04:** Valid bill reminders shall be stored in the database.

**FR-BILL-05:** The system shall retrieve stored bill reminders for display.

**FR-BILL-06:** Bill reminders shall be ordered or presented in a way that allows upcoming due dates to be identified.

**FR-BILL-07:** The system shall support deletion of an existing bill reminder.

---

### Feature: Savings Goal Tracking

**Related Use Case:** UC-05

**FR-SAV-01:** The system shall retrieve the student's current savings information.

**FR-SAV-02:** Savings information shall include an amount saved and a target amount.

**FR-SAV-03:** The student shall be able to update savings information.

**FR-SAV-04:** The backend shall validate savings values before persistence.

**FR-SAV-05:** Valid savings updates shall persist in the database.

**FR-SAV-06:** The client shall display current savings information to the student.

---

### Feature: Financial Aid Deadline Tracking

**Related Use Case:** UC-06

**FR-AID-01:** The system shall support retrieval of stored financial aid deadlines.

**FR-AID-02:** The system shall support creation of valid financial aid deadline information.

**FR-AID-03:** The system shall validate financial aid deadline information before persistence.

**FR-AID-04:** The system shall support updating an existing financial aid deadline.

**FR-AID-05:** The system shall support deletion of an existing financial aid deadline.

**FR-AID-06:** Valid financial aid deadline information shall be persisted through the database layer.

---

## 4.6 Error Handling Requirements

**FR-ERR-01:** The API shall return an error response when requested data cannot be retrieved.

**FR-ERR-02:** The API shall reject malformed or invalid supported financial data.

**FR-ERR-03:** The client shall not intentionally represent a failed persistent-data operation as successful.

**FR-ERR-04:** Database-operation failures shall be handled by the server rather than causing an uncontrolled application failure.

---

## 4.7 Requirements-to-Use-Case Summary

| Feature | Use Case(s) | Primary Requirement Group |
|---|---|---|
| Expense Tracking | UC-01 | FR-EXP |
| Budget Management and Summary | UC-02, UC-03 | FR-BUD |
| Bill Reminders | UC-04 | FR-BILL |
| Savings Goal Tracking | UC-05 | FR-SAV |
| Financial Aid Deadline Tracking | UC-06 | FR-AID |

This mapping establishes the first level of requirements traceability. Section 8.7 extends this relationship by mapping the required functional requirements to verification test IDs.
---

# 5. Nonfunctional Requirements

## 5.1 Performance Requirements

SteadyStep is intended to provide a responsive experience for an individual student managing personal financial information.

**NFR-PERF-01:** Under normal local operating conditions, standard API requests involving budget, expense, bill, savings, and financial aid data should return a response within 2 seconds.

**NFR-PERF-02:** Dashboard financial information should become visible within 3 seconds after the client successfully connects to the locally running API under normal development conditions.

**NFR-PERF-03:** User-initiated financial updates should be reflected in the interface without requiring the user to manually restart the application.

**NFR-PERF-04:** The application shall support the expected workload of a single student user without requiring external database infrastructure.

### Verification

Performance requirements can be verified during integration testing by running the React client, Express server, and SQLite database locally and measuring representative financial operations.

These requirements describe the expected academic prototype environment and should not be interpreted as production-scale performance guarantees.

---

## 5.2 Usability and Reliability Requirements

### Usability

**NFR-USE-01:** Primary financial actions shall be accessible from the main application interface without requiring direct interaction with the API or database.

**NFR-USE-02:** Financial forms shall use clearly labeled fields and actions so that a student can understand what information is required.

**NFR-USE-03:** Budget, expense, savings, and bill information shall use consistent monetary formatting within the user interface.

**NFR-USE-04:** The application's primary financial workflows shall remain usable at common desktop browser dimensions.

**NFR-USE-05:** Error states involving unavailable financial information shall be visibly distinguishable from successfully loaded financial data.

### Reliability

**NFR-REL-01:** Successfully persisted financial records shall remain available after a browser refresh unless the database itself has been reset or modified.

**NFR-REL-02:** Invalid financial input shall not be intentionally stored as a successful valid record.

**NFR-REL-03:** Failure of a database operation shall result in a controlled server response rather than an intentional uncontrolled server termination.

**NFR-REL-04:** Core Must-have workflows shall successfully complete during end-to-end verification before final submission.

---

# 5.3 Security and Privacy Requirements

SteadyStep stores personal financial organization data. Although the current version is an academic prototype intended primarily for local use, security was considered during implementation.

The security requirements below reflect risks identified during secure-development coursework involving access control, injection, sensitive data, logging, dependency management, and OWASP/STRIDE concepts.

## 5.3.1 Input Validation

**NFR-SEC-01:** Financial data received by the API shall be validated before it is written to the database.

**NFR-SEC-02:** Numeric financial fields shall be converted and checked before being accepted as valid monetary values.

**NFR-SEC-03:** Required text and date fields shall be checked before applicable records are created.

**NFR-SEC-04:** Invalid client input shall result in an appropriate client-error response rather than being intentionally persisted as valid data.

### Reasoning

Client-side validation improves usability but cannot be considered a security boundary because API requests can be created without using the SteadyStep interface. Validation is therefore also performed by the backend.

---

## 5.3.2 Database Security

**NFR-SEC-05:** Application routes shall access persistent data through Prisma rather than constructing SQL statements directly from user input.

**NFR-SEC-06:** The React client shall not directly access the SQLite database.

**NFR-SEC-07:** Database operations shall be performed through the server-side data-access layer.

### Reasoning

Using Prisma and separating database access from the client reduces the application's exposure to direct database manipulation and reduces the need to construct raw SQL from untrusted input.

---

## 5.3.3 Secrets and Configuration

**NFR-SEC-08:** Sensitive environment configuration shall not be intentionally hardcoded into client-side source code.

**NFR-SEC-09:** Environment-specific configuration shall use environment variables where appropriate.

**NFR-SEC-10:** Files containing sensitive environment values shall be excluded from version control when secrets are present.

### Reasoning

Separating environment configuration from source code reduces the risk of accidentally committing credentials or other sensitive configuration to the public repository.

The current SQLite development configuration does not require a production database username or password. Future production deployments would require protected database credentials and deployment-specific secret management.

---

## 5.3.4 Error Handling and Logging

**NFR-SEC-11:** API failures shall return controlled error responses.

**NFR-SEC-12:** Error messages returned to the client should provide enough information to communicate failure without intentionally exposing sensitive configuration information.

**NFR-SEC-13:** Passwords, authentication secrets, database credentials, and other sensitive values shall not intentionally be written to application logs.

### Reasoning

Application logs and error responses can unintentionally expose sensitive information. SteadyStep therefore treats detailed server information differently from information that should be displayed to the user.

---

## 5.3.5 Dependency Security

**NFR-SEC-14:** Third-party application dependencies shall be managed through the project's package manifests and lock files.

**NFR-SEC-15:** Dependency changes shall remain reproducible through the committed package configuration.

**NFR-SEC-16:** Known dependency vulnerabilities identified during development should be reviewed and either resolved or documented when immediate resolution is not practical.

---

## 5.3.6 Privacy Impact Checklist

### Personal Data Collected

SteadyStep may store financial organization data entered by the user, including:

- Expense descriptions.
- Expense categories.
- Expense amounts.
- Expense dates.
- Budget amounts.
- Savings amounts and targets.
- Bill names.
- Bill amounts.
- Bill due dates.
- Financial aid deadline information.

### Purpose of Collection

The information is collected only to provide the application's student finance organization functionality.

### Storage

The current implementation stores supported persistent information in a local SQLite database accessed through the Express and Prisma backend.

### Access

Application data is accessed through supported API routes rather than by direct database access from the React client.

### User Control

Where supported by the implemented feature, users can create, update, retrieve, or delete their financial information.

Further privacy controls such as account-level data export and complete account deletion are outside the current prototype scope and are candidates for future development.

### Privacy Principle

SteadyStep follows the principle of minimizing collected information by focusing on data required to provide its financial organization features. The prototype does not require direct integration with a student's bank account.

---

# 5.4 Security Threat Analysis

The following summarizes important STRIDE and OWASP-related risks considered during development.

| Threat Area | Potential Risk | SteadyStep Response | Status |
|---|---|---|---|
| Spoofing / Authentication | A user could potentially access functionality without strong identity verification. | Production-grade authentication and authorization are identified as future security work if SteadyStep becomes a deployed multi-user system. | Deferred |
| Tampering | Invalid or manipulated API input could alter stored financial information. | Backend validation is used before supported financial records are persisted. | Addressed in prototype |
| Repudiation | The prototype does not maintain a complete audit trail for every financial change. | Full audit logging is identified as future work because the current application is primarily a single-user academic prototype. | Deferred |
| Information Disclosure | Sensitive information could be exposed through source code, errors, or logging. | Environment configuration, controlled API errors, and avoidance of intentionally logging secrets reduce this risk. | Partially addressed |
| Denial of Service | Excessive requests could reduce availability. | Rate limiting and production infrastructure protections are outside the current local prototype scope. | Deferred |
| Elevation of Privilege | A future multi-user version could expose another user's data if authorization were implemented incorrectly. | Strong per-user authorization would be required before production multi-user deployment. | Deferred |
| Injection | Untrusted input could affect database operations. | Server validation and Prisma-based database access reduce reliance on directly constructed SQL. | Addressed in prototype |
| Security Misconfiguration | Development configuration could expose inappropriate settings in production. | The current environment is documented as a local prototype; production configuration would require separate security review. | Partially addressed |
| Vulnerable Components | Third-party dependencies may contain known vulnerabilities. | Dependencies are managed through package manifests/lock files and should be reviewed as part of final security testing. | Ongoing |

---

# 5.5 Security Decisions and Deferred Work

Security requirements were prioritized according to the actual scope of SteadyStep.

Because the current system is a locally operated academic prototype, some production security controls would add significant complexity without accurately representing the deployment environment.

The project therefore prioritized controls directly relevant to the implemented system, including:

- Backend input validation.
- Controlled API error handling.
- Separation between the client and database.
- Prisma-mediated database operations.
- Environment-based configuration.
- Avoidance of plaintext application secrets in client code.
- Dependency management through package manifests and lock files.

The following controls are intentionally identified as future work before SteadyStep could become a production multi-user financial application:

- Production-grade authentication.
- Per-user authorization.
- Password hashing and credential lifecycle management if passwords are introduced.
- API rate limiting.
- HTTPS deployment configuration.
- Centralized secure logging and auditing.
- Account-level data export and deletion.
- Production database credential management.
- Automated dependency vulnerability monitoring.

Documenting these items as deferred work is intentional. The security analysis distinguishes controls that exist in the prototype from controls that would be required for a production deployment rather than claiming protections that the current implementation does not provide.
---

# 6. Data Requirements

## 6.1 Data Overview

SteadyStep uses a relational SQLite database accessed through Prisma.

The current database contains five persistent application models:

1. Expense
2. Budget
3. Bill
4. SavingsGoal
5. AidDeadline

The React client does not directly access the database. Persistent data is requested or modified through the Express API, and Prisma performs the corresponding database operations.

The current prototype does not contain a persistent User entity. As a result, the existing database represents a single-user application environment. Associating each financial record with an authenticated user is identified as future work for a production multi-user version.

---

## 6.2 Expense Entity

The `Expense` model stores individual financial transactions entered by the student.

| Field | Type | Required | Description |
|---|---|---|---|
| id | Integer | Yes | Unique automatically generated expense identifier. |
| description | String | Yes | Human-readable description of the expense. |
| category | String | Yes | Category used to organize the expense. |
| amount | Float | Yes | Monetary value of the expense. |
| date | String | Yes | Date associated with the expense. |
| createdAt | DateTime | Yes | Automatically generated timestamp indicating when the record was created. |

### Data Rules

- Each expense must have a description.
- Each expense must have a category.
- Each expense must have an amount greater than zero.
- Each expense must contain a date.
- The application generates the expense ID automatically.
- `createdAt` is generated automatically when the record is created.

### Related Requirements

- FR-EXP-01 through FR-EXP-06
- UC-01

---

## 6.3 Budget Entity

The `Budget` model stores the current monthly budget used by the dashboard.

| Field | Type | Required | Description |
|---|---|---|---|
| id | Integer | Yes | Identifier for the stored budget record. |
| amount | Float | Yes | Current monthly budget amount. |
| updatedAt | DateTime | Yes | Automatically updated timestamp for the most recent budget modification. |

### Data Rules

- The current prototype maintains one primary budget record.
- The stored amount must be greater than zero.
- `updatedAt` is automatically modified whenever the budget record changes.

### Design Note

The current implementation treats the budget as a singleton-style record rather than storing multiple historical monthly budget records.

This design was selected to keep the prototype focused on the student's current financial position. Supporting multiple budget periods and historical budget comparisons is a possible future enhancement.

### Related Requirements

- FR-BUD-01 through FR-BUD-06
- UC-02
- UC-03

---

## 6.4 Bill Entity

The `Bill` model stores upcoming financial obligations.

| Field | Type | Required | Description |
|---|---|---|---|
| id | Integer | Yes | Unique automatically generated bill identifier. |
| name | String | Yes | Name or description of the bill. |
| amount | Float | Yes | Amount due for the bill. |
| dueDate | String | Yes | Date on which the bill is due. |
| createdAt | DateTime | Yes | Automatically generated record creation timestamp. |

### Data Rules

- A bill must contain a name.
- A bill amount must be greater than zero.
- A due date must be provided.
- Bill IDs are generated automatically.
- `createdAt` is generated automatically.

### Related Requirements

- FR-BILL-01 through FR-BILL-07
- UC-04

---

## 6.5 SavingsGoal Entity

The `SavingsGoal` model stores the student's current savings progress.

| Field | Type | Required | Description |
|---|---|---|---|
| id | Integer | Yes | Identifier for the savings goal record. |
| saved | Float | Yes | Current amount saved. |
| target | Float | Yes | Target savings amount. |
| updatedAt | DateTime | Yes | Automatically updated timestamp for the latest change. |

### Data Rules

- The saved amount may not be negative.
- The target amount must be greater than zero.
- The current prototype maintains one primary savings goal.
- `updatedAt` changes automatically when savings information is updated.

### Design Note

The prototype maintains one active savings goal because the initial application scope focused on simple financial organization rather than management of multiple simultaneous savings goals.

Supporting multiple named savings goals is a candidate for future development.

### Related Requirements

- FR-SAV-01 through FR-SAV-06
- UC-05

---

## 6.6 AidDeadline Entity

The `AidDeadline` model stores deadlines related to financial aid or other student financial responsibilities.

| Field | Type | Required | Description |
|---|---|---|---|
| id | Integer | Yes | Unique automatically generated deadline identifier. |
| title | String | Yes | Name or description of the deadline. |
| dueDate | String | Yes | Date associated with the deadline. |
| status | String | Yes | Current status of the deadline. |
| createdAt | DateTime | Yes | Automatically generated creation timestamp. |

### Data Rules

- Every deadline must contain a title.
- Every deadline must contain a due date.
- Every deadline must contain a supported status.
- Deadline IDs are generated automatically.
- `createdAt` is generated automatically.

### Supported Prototype Status Values

The current application supports deadline states including:

- Planned
- In Progress
- Submitted

### Related Requirements

- FR-AID-01 through FR-AID-06
- UC-06

---

## 6.7 Entity Relationships

The current SteadyStep database does not define direct foreign-key relationships between the five persistent financial models.

Each model represents an independent financial concern within the current single-user prototype:

- Expenses represent completed spending.
- Budget represents the current spending limit.
- Bills represent upcoming financial obligations.
- SavingsGoal represents savings progress.
- AidDeadline represents student financial deadlines.

These records are logically connected through the SteadyStep dashboard rather than through explicit database relationships.

### Current Logical Model

```text
                   SteadyStep Dashboard
                           |
          -----------------------------------------
          |          |          |         |        |
       Expense     Budget      Bill   SavingsGoal AidDeadline

---

# 7. Architecture and Design

## 7.1 Architecture Overview

SteadyStep uses a layered full-stack architecture:

```text
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
---

# 8. Verification and Validation

## 8.1 Verification and Validation Strategy

SteadyStep uses automated testing, manual functional testing, continuous integration, and requirements traceability to verify that the implemented system matches the requirements defined in this SRS.

The primary verification methods are:

- **Automated validation tests:** Verify valid and invalid financial data such as expenses, budgets, bills, savings goals, and financial aid deadlines.
- **API integration tests:** Exercise SteadyStep server endpoints and verify HTTP responses and validation behavior.
- **Manual functional testing:** Confirms that features work correctly through the React user interface from the user's perspective.
- **Continuous Integration:** GitHub Actions automatically installs dependencies, generates the Prisma client, executes the server test suite, builds the server, and builds the client.
- **Coverage analysis:** Vitest with the V8 coverage provider measures which portions of the server code are exercised by automated tests.

A requirement is considered verified when its associated test passes or its documented manual verification procedure succeeds.

## 8.2 Automated Test Environment

The SteadyStep server test suite uses:

- Vitest as the automated test framework.
- V8 as the code coverage provider.
- TypeScript for test implementation.
- Express API integration testing for server behavior.
- Prisma with SQLite for application persistence.
- GitHub Actions for continuous integration.

Automated tests are stored under:

`server/src/tests/`

The current test files are:

- `validation.test.ts`
- `api.test.ts`

Tests can be executed locally with:

`npm test`

Coverage can be generated with:

`npm run coverage`

## 8.3 Validation Testing

Validation tests verify that SteadyStep accepts valid financial information and rejects invalid input.

Current validation tests include:

| Test ID | Verification |
|---|---|
| TEST-EXP-01 | Accepts a valid expense |
| TEST-EXP-02 | Rejects a non-positive expense amount |
| TEST-BUD-01 | Accepts a positive budget |
| TEST-BILL-01 | Accepts a valid bill |
| TEST-SAV-01 | Validates savings progress |
| TEST-AID-01 | Validates a financial aid deadline |

These tests protect core financial data from invalid values before the data is relied upon by the application.

## 8.4 API Integration Testing

API integration tests exercise the Express application and verify server behavior through actual API request/response paths.

The integration suite currently contains 10 tests. Combined with the six validation tests, the automated suite contains:

- **2 test files**
- **16 automated tests**
- **16 passing tests**
- **0 failing tests**

Integration testing covers core application behavior including API availability, valid requests, invalid requests, and financial feature endpoints.

## 8.5 Continuous Integration Verification

SteadyStep uses GitHub Actions as its Continuous Integration system.

The workflow is stored at:

`.github/workflows/ci.yml`

For pushes and pull requests, CI performs automated verification of the application. The workflow includes:

1. Checkout of the repository.
2. Node.js environment setup.
3. Dependency installation.
4. Prisma client generation.
5. Automated server tests.
6. Server build.
7. Client dependency installation.
8. Client build.

A successful green workflow indicates that the automated tests and required builds completed successfully in a clean CI environment.

This provides additional verification beyond testing only on the developer's local computer.

## 8.6 Code Coverage

SteadyStep uses Vitest and the V8 coverage provider to measure automated server test coverage.

At the current final verification point, the automated suite reports:

| Metric | Coverage |
|---|---:|
| Statements | 44.89% |
| Branches | 18.64% |
| Functions | 52.63% |
| Lines | 44.89% |

Individual components with stronger coverage include:

- `app.ts` — 81.25% statement coverage
- `prisma.ts` — 100% statement coverage
- `budgetRoutes.ts` — 66.66% statement coverage
- `expenseRoutes.ts` — 50% statement coverage
- `healthRoutes.ts` — 100% statement coverage

The coverage report should not be interpreted as proof that every possible application path has been tested. The automated suite prioritizes Must-have functionality, input validation, API integration, and critical server behavior. Several CRUD branches and error paths remain only partially covered.

The report therefore provides measurable evidence that core functionality is automatically exercised while honestly identifying areas where additional automated testing could improve future versions of SteadyStep.

## 8.7 Requirements Traceability Matrix

The Requirements Traceability Matrix connects SteadyStep's Must-have functional requirements to their corresponding use cases and verification evidence. Each Must-have requirement is mapped to at least one test ID so that implementation and verification can be traced directly to the requirements defined in this SRS.

| Requirement | Feature | Related Use Case | Verification |
|---|---|---|---|
| FR-EXP-01 | Expense Tracking | UC-01 — Record an Expense | TEST-EXP-01 |
| FR-EXP-02 | Expense Tracking | UC-01 — Record an Expense | TEST-EXP-02 |
| FR-EXP-03 | Expense Tracking | UC-01 — Record an Expense | TEST-EXP-03 |
| FR-EXP-04 | Expense Tracking | UC-01 — Record an Expense | TEST-EXP-04 |
| FR-EXP-05 | Expense Tracking | UC-01 — Record an Expense | TEST-API-01 |
| FR-EXP-06 | Expense Tracking | UC-01 — Record an Expense | TEST-API-02 |
| FR-BUD-01 | Budget Management | UC-02 — Manage Budget | TEST-BUD-01 |
| FR-BUD-02 | Budget Management | UC-02 — Manage Budget | TEST-BUD-02 |
| FR-BUD-03 | Budget Management | UC-02 — Manage Budget | TEST-BUD-03 |
| FR-BILL-01 | Bill Tracking | UC-03 — Manage Bills | TEST-BILL-01 |
| FR-BILL-02 | Bill Tracking | UC-03 — Manage Bills | TEST-BILL-02 |
| FR-BILL-03 | Bill Tracking | UC-03 — Manage Bills | TEST-BILL-03 |
| FR-SAV-01 | Savings Goals | UC-04 — Manage Savings Goal | TEST-SAV-01 |
| FR-SAV-02 | Savings Goals | UC-04 — Manage Savings Goal | TEST-SAV-02 |
| FR-AID-01 | Financial Aid Deadlines | UC-05 — Manage Aid Deadline | TEST-AID-01 |
| FR-AID-02 | Financial Aid Deadlines | UC-05 — Manage Aid Deadline | TEST-AID-02 |

The matrix provides direct traceability between SteadyStep's Must-have requirements, use cases, and automated verification activities. The listed test IDs correspond to tests documented in the V&V plan and implemented in the repository's automated test suite.

Where multiple requirements are exercised through the same API workflow, integration testing supplements the feature-specific verification. Coverage results provide additional evidence that the application's core server behavior is exercised, but coverage percentage alone does not demonstrate that every possible behavior or error path has been tested.

## 8.8 Defect Tracking

Known software defects are tracked using GitHub Issues.

Each defect Issue should contain:

- A clear description of the defect.
- Steps required to reproduce the problem.
- Expected behavior.
- Actual behavior.
- Severity or priority.
- A reference to the related feature Issue using `refs #<issue-number>`.

Suggested severity levels are:

- **Critical:** Prevents the application or a core feature from functioning.
- **High:** Major feature behavior is incorrect with no reasonable workaround.
- **Medium:** Feature works but contains a noticeable functional problem.
- **Low:** Minor problem that does not prevent normal use.

Resolved defects should reference the fixing commit or pull request when applicable.

At final submission, any known unresolved defects will remain documented as GitHub Issues rather than being omitted from the project record.

## 8.9 Final Verification Status

At the current verification point:

- The server automated test suite passes.
- 16 of 16 automated tests pass.
- Server coverage reporting is operational.
- GitHub Actions CI successfully verifies the server and client.
- The server builds successfully.
- The client builds successfully.
- Core SteadyStep financial features have been manually demonstrated through the running application.

Together, automated testing, CI verification, coverage reporting, manual testing, and requirements traceability provide the verification evidence for the current SteadyStep prototype.
---

# 8. Requirements Traceability

## 8.1 Requirements Traceability Matrix

The following Requirements Traceability Matrix (RTM) connects SteadyStep's functional requirements to their related use cases, implementation components, and verification tests. This matrix provides evidence that the documented requirements are represented in both the system design and implementation.

| Requirement | Feature | Use Case | Implementation | Verification |
|---|---|---|---|---|
| FR-EXP-01 – FR-EXP-06 | Expense Tracking | UC-01 | Expense API / Expense model | API and validation tests |
| FR-BUD-01 – FR-BUD-06 | Budget Management and Summary | UC-02, UC-03 | Budget API / Budget model | API and validation tests |
| FR-BILL-01 – FR-BILL-07 | Bill Reminders | UC-04 | Bill API / Bill model | API and validation tests |
| FR-SAV-01 – FR-SAV-06 | Savings Goal Tracking | UC-05 | Savings API / SavingsGoal model | API and validation tests |
| FR-AID-01 – FR-AID-06 | Financial Aid Deadline Tracking | UC-06 | Financial Aid API / AidDeadline model | API and validation tests |

## 8.2 Verification Evidence

Automated verification is implemented using Vitest. Validation tests verify input requirements for expenses, budgets, bills, savings goals, and financial aid deadlines. API integration tests verify the behavior of the Express REST API and its interaction with the application's persistence layer.

The automated test suite is executed locally using:

`npm test`

Test coverage can be generated using:

`npm run coverage`

Continuous Integration is configured through GitHub Actions. The CI workflow installs dependencies, generates the Prisma client, executes the automated test suite, and builds the application. This provides repeatable verification whenever changes are pushed to the repository.

## 8.3 Traceability Summary

SteadyStep maintains traceability from documented requirements through use cases, implementation components, and automated verification. The RTM can be updated as additional functionality or tests are added to the system.