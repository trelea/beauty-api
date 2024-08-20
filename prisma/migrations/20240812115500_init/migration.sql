-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateTable
CREATE TABLE "AppointmentsLashes" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "googleUserId" TEXT,
    "masterId" TEXT NOT NULL,
    "time" TIME NOT NULL,
    "date" DATE NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentsLashes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentsNails" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "googleUserId" TEXT,
    "masterId" TEXT NOT NULL,
    "time" TIME NOT NULL,
    "date" DATE NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentsNails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentsBrows" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "googleUserId" TEXT,
    "masterId" TEXT NOT NULL,
    "time" TIME NOT NULL,
    "date" DATE NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentsBrows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AppointmentsLashes" ADD CONSTRAINT "AppointmentsLashes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsLashes" ADD CONSTRAINT "AppointmentsLashes_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsLashes" ADD CONSTRAINT "AppointmentsLashes_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsNails" ADD CONSTRAINT "AppointmentsNails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsNails" ADD CONSTRAINT "AppointmentsNails_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsNails" ADD CONSTRAINT "AppointmentsNails_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsBrows" ADD CONSTRAINT "AppointmentsBrows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsBrows" ADD CONSTRAINT "AppointmentsBrows_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsBrows" ADD CONSTRAINT "AppointmentsBrows_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;
