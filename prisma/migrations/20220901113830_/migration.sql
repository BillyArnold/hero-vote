-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Votes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "image" TEXT NOT NULL,
    "votedFor" INTEGER NOT NULL,
    "votedAgainst" INTEGER NOT NULL,
    "winPercent" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Votes_id_key" ON "Votes"("id");
