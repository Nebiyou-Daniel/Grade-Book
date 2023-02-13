-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_courses" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "year" TEXT NOT NULL,
    "semester" TEXT NOT NULL,
    "courseName" TEXT NOT NULL,
    "credit" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "courses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_courses" ("courseName", "credit", "id", "score", "semester", "userId", "year") SELECT "courseName", "credit", "id", "score", "semester", "userId", "year" FROM "courses";
DROP TABLE "courses";
ALTER TABLE "new_courses" RENAME TO "courses";
CREATE UNIQUE INDEX "courses_courseName_key" ON "courses"("courseName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
