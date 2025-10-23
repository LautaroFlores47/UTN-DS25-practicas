/*
  Warnings:

  - Made the column `authorId` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Book" DROP CONSTRAINT "Book_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Book" ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Book" ADD CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."Author"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
