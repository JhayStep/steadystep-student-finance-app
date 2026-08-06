-- CreateTable
CREATE TABLE "SavingsGoal" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "saved" REAL NOT NULL,
    "target" REAL NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
