/*
  Warnings:

  - Added the required column `title` to the `editors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "editors" ADD COLUMN     "title" TEXT NOT NULL;
