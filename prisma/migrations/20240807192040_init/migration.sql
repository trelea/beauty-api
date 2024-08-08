/*
  Warnings:

  - You are about to drop the `MasterServices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MasterServices" DROP CONSTRAINT "MasterServices_masterId_fkey";

-- AlterTable
ALTER TABLE "Master" ADD COLUMN     "services" "Service"[];

-- DropTable
DROP TABLE "MasterServices";
