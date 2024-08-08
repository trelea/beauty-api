/*
  Warnings:

  - Added the required column `birthDate` to the `Master` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Master" ADD COLUMN     "birthDate" DATE NOT NULL;
