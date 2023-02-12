/*
  Warnings:

  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - Added the required column `universityName` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_courseName_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Course";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "courses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" INTEGER NOT NULL,
    "courseName" TEXT NOT NULL,
    "credit" INTEGER NOT NULL,
    "score" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "A" TEXT NOT NULL DEFAULT '''4.0''',
    "A_minus" TEXT NOT NULL DEFAULT '''3.75''',
    "B_plus" TEXT NOT NULL DEFAULT '''3.5''',
    "B" TEXT NOT NULL DEFAULT '''3.25''',
    "B_minus" TEXT NOT NULL DEFAULT '''3.0''',
    "C_plus" TEXT NOT NULL DEFAULT '''2.75''',
    "C" TEXT NOT NULL DEFAULT '''2.5''',
    "C_minus" TEXT NOT NULL DEFAULT '''2.0''',
    "D" TEXT NOT NULL DEFAULT '''1.75''',
    "F" TEXT NOT NULL DEFAULT '''1.50''',
    CONSTRAINT "Grade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "cgpa" TEXT NOT NULL DEFAULT '''0'''
);
INSERT INTO "new_users" ("email", "fullName", "id", "password") SELECT "email", "fullName", "id", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "courses_courseName_key" ON "courses"("courseName");
