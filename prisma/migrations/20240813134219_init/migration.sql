/*
  Warnings:

  - You are about to drop the column `date` on the `AppointmentsNails` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `AppointmentsNails` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `AppointmentsNails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentsNails" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "dateTime" TIMESTAMP NOT NULL;
