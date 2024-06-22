/*
  Warnings:

  - You are about to drop the column `upvotes` on the `Board` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Board" DROP COLUMN "upvotes",
ADD COLUMN     "upvote" INTEGER NOT NULL DEFAULT 0;
