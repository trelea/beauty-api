/*
  Warnings:

  - You are about to drop the column `dateTime` on the `AppointmentsLashes` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `AppointmentsNails` table. All the data in the column will be lost.
  - Added the required column `date` to the `AppointmentsLashes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `AppointmentsLashes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `AppointmentsNails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `AppointmentsNails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppointmentsLashes" DROP COLUMN "dateTime",
ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "time" TIME NOT NULL;

-- AlterTable
ALTER TABLE "AppointmentsNails" DROP COLUMN "dateTime",
ADD COLUMN     "date" DATE NOT NULL,
ADD COLUMN     "time" TIME NOT NULL;
