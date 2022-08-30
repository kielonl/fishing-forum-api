/*
  Warnings:

  - Made the column `parent_id` on table `comment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "comment" ALTER COLUMN "parent_id" SET NOT NULL;
