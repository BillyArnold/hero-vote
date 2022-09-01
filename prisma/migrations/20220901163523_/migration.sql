/*
  Warnings:

  - You are about to drop the column `votedAgainst` on the `Votes` table. All the data in the column will be lost.
  - Added the required column `totalVotes` to the `Votes` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Votes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "image" TEXT NOT NULL,
    "votedFor" INTEGER NOT NULL,
    "totalVotes" INTEGER NOT NULL,
    "winPercent" REAL NOT NULL
);
INSERT INTO "new_Votes" ("id", "image", "name", "votedFor", "winPercent") SELECT "id", "image", "name", "votedFor", "winPercent" FROM "Votes";
DROP TABLE "Votes";
ALTER TABLE "new_Votes" RENAME TO "Votes";
CREATE UNIQUE INDEX "Votes_id_key" ON "Votes"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
