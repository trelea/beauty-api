/*
  Warnings:

  - You are about to drop the column `unauthUser` on the `AppointmentsBrows` table. All the data in the column will be lost.
  - You are about to drop the column `unauthUser` on the `AppointmentsLashes` table. All the data in the column will be lost.
  - You are about to drop the column `unauthUser` on the `AppointmentsNails` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unauthUserId]` on the table `AppointmentsBrows` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unauthUserId]` on the table `AppointmentsLashes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unauthUserId]` on the table `AppointmentsNails` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "AppointmentsBrows" DROP COLUMN "unauthUser",
ADD COLUMN     "unauthUserId" TEXT;

-- AlterTable
ALTER TABLE "AppointmentsLashes" DROP COLUMN "unauthUser",
ADD COLUMN     "unauthUserId" TEXT;

-- AlterTable
ALTER TABLE "AppointmentsNails" DROP COLUMN "unauthUser",
ADD COLUMN     "unauthUserId" TEXT;

-- CreateTable
CREATE TABLE "unauthUserSource" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "unauthUserSource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentsBrows_unauthUserId_key" ON "AppointmentsBrows"("unauthUserId");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentsLashes_unauthUserId_key" ON "AppointmentsLashes"("unauthUserId");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentsNails_unauthUserId_key" ON "AppointmentsNails"("unauthUserId");

-- AddForeignKey
ALTER TABLE "AppointmentsBrows" ADD CONSTRAINT "AppointmentsBrows_unauthUserId_fkey" FOREIGN KEY ("unauthUserId") REFERENCES "unauthUserSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsLashes" ADD CONSTRAINT "AppointmentsLashes_unauthUserId_fkey" FOREIGN KEY ("unauthUserId") REFERENCES "unauthUserSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsNails" ADD CONSTRAINT "AppointmentsNails_unauthUserId_fkey" FOREIGN KEY ("unauthUserId") REFERENCES "unauthUserSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;
