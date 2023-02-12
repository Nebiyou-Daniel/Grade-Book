/*
  Warnings:

  - You are about to drop the column `universityName` on the `users` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "cgpa" TEXT NOT NULL DEFAULT '''0'''
);
INSERT INTO "new_users" ("cgpa", "email", "fullName", "id", "password") SELECT "cgpa", "email", "fullName", "id", "password" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
