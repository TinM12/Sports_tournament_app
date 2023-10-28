/*
  Warnings:

  - Added the required column `contestantName` to the `contestant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "contestant" ADD COLUMN     "contestantName" VARCHAR(200) NOT NULL;
