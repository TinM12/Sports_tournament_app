/*
  Warnings:

  - You are about to drop the column `contestandid` on the `result` table. All the data in the column will be lost.
  - You are about to drop the column `isawaycontestandid` on the `result` table. All the data in the column will be lost.
  - Added the required column `awaycontestandid` to the `result` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homecontestandid` to the `result` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "result" DROP CONSTRAINT "result_contestandid_fkey";

-- DropForeignKey
ALTER TABLE "result" DROP CONSTRAINT "result_isawaycontestandid_fkey";

-- AlterTable
ALTER TABLE "result" DROP COLUMN "contestandid",
DROP COLUMN "isawaycontestandid",
ADD COLUMN     "awaycontestandid" INTEGER NOT NULL,
ADD COLUMN     "homecontestandid" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_homecontestandid_fkey" FOREIGN KEY ("homecontestandid") REFERENCES "contestant"("contestandid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_awaycontestandid_fkey" FOREIGN KEY ("awaycontestandid") REFERENCES "contestant"("contestandid") ON DELETE NO ACTION ON UPDATE NO ACTION;
