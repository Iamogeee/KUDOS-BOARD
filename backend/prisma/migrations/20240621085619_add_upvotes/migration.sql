/*
  Warnings:

  - Made the column `author` on table `Board` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `img_url` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "author" SET NOT NULL;

-- AlterTable
ALTER TABLE "Card" ADD COLUMN     "img_url" TEXT NOT NULL,
ADD COLUMN     "upvote" INTEGER NOT NULL DEFAULT 0;
