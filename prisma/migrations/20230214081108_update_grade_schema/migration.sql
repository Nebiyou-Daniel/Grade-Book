-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Grade" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "A_plus" TEXT NOT NULL DEFAULT '''4.0''',
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
INSERT INTO "new_Grade" ("A", "A_minus", "B", "B_minus", "B_plus", "C", "C_minus", "C_plus", "D", "F", "id", "userId") SELECT "A", "A_minus", "B", "B_minus", "B_plus", "C", "C_minus", "C_plus", "D", "F", "id", "userId" FROM "Grade";
DROP TABLE "Grade";
ALTER TABLE "new_Grade" RENAME TO "Grade";
CREATE UNIQUE INDEX "Grade_userId_key" ON "Grade"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
