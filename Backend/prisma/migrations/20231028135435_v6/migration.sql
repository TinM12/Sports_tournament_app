/*
  Warnings:

  - You are about to drop the column `winner` on the `result` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "result" DROP COLUMN "winner",
ADD COLUMN     "scoreAway" INTEGER,
ADD COLUMN     "scoreHome" INTEGER;
