/*
  Warnings:

  - Added the required column `phone` to the `AppointmentsBrows` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `AppointmentsLashes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `AppointmentsNails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentsBrows" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AppointmentsLashes" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "AppointmentsNails" ADD COLUMN     "phone" TEXT NOT NULL;
