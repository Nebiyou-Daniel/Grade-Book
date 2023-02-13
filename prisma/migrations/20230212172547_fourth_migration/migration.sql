/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "universityName" TEXT,
    "cgpa" TEXT NOT NULL DEFAULT '''0'''
);
INSERT INTO "new_users" ("cgpa", "email", "fullName", "id", "password", "universityName") SELECT "cgpa", "email", "fullName", "id", "password", "universityName" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Grade_userId_key" ON "Grade"("userId");
