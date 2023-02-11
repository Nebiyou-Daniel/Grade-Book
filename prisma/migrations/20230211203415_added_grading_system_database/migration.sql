-- CreateTable
CREATE TABLE "GradeSystem" (
    "A" REAL NOT NULL,
    "Am" REAL NOT NULL,
    "Bp" REAL NOT NULL,
    "B" REAL NOT NULL,
    "Bm" REAL NOT NULL,
    "Cp" REAL NOT NULL,
    "C" REAL NOT NULL,
    "Cm" REAL NOT NULL,
    "D" REAL NOT NULL,
    "F" REAL NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "GradeSystem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "GradeSystem_userId_key" ON "GradeSystem"("userId");
