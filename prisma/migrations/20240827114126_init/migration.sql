-- CreateEnum
CREATE TYPE "Service" AS ENUM ('Lashes', 'Brows', 'Nails');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'APPROVED', 'DENIED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoogleUser" (
    "id" TEXT NOT NULL,
    "profile" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoogleUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Master" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "birthDate" DATE NOT NULL,
    "description" TEXT,
    "thumbnail" TEXT NOT NULL,
    "services" "Service"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentsBrows" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "googleUserId" TEXT,
    "unauthUserId" TEXT,
    "masterId" TEXT NOT NULL,
    "time" TIME NOT NULL,
    "date" DATE NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentsBrows_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppointmentsLashes" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "googleUserId" TEXT,
    "unauthUserId" TEXT,
    "masterId" TEXT NOT NULL,
    "time" TIME NOT NULL,
    "date" DATE NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT,
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
    "unauthUserId" TEXT,
    "masterId" TEXT NOT NULL,
    "time" TIME NOT NULL,
    "date" DATE NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppointmentsNails_pkey" PRIMARY KEY ("id")
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Master_email_key" ON "Master"("email");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentsBrows_unauthUserId_key" ON "AppointmentsBrows"("unauthUserId");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentsLashes_unauthUserId_key" ON "AppointmentsLashes"("unauthUserId");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentsNails_unauthUserId_key" ON "AppointmentsNails"("unauthUserId");

-- AddForeignKey
ALTER TABLE "AppointmentsBrows" ADD CONSTRAINT "AppointmentsBrows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsBrows" ADD CONSTRAINT "AppointmentsBrows_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsBrows" ADD CONSTRAINT "AppointmentsBrows_unauthUserId_fkey" FOREIGN KEY ("unauthUserId") REFERENCES "unauthUserSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsBrows" ADD CONSTRAINT "AppointmentsBrows_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsLashes" ADD CONSTRAINT "AppointmentsLashes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsLashes" ADD CONSTRAINT "AppointmentsLashes_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsLashes" ADD CONSTRAINT "AppointmentsLashes_unauthUserId_fkey" FOREIGN KEY ("unauthUserId") REFERENCES "unauthUserSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsLashes" ADD CONSTRAINT "AppointmentsLashes_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsNails" ADD CONSTRAINT "AppointmentsNails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsNails" ADD CONSTRAINT "AppointmentsNails_googleUserId_fkey" FOREIGN KEY ("googleUserId") REFERENCES "GoogleUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsNails" ADD CONSTRAINT "AppointmentsNails_unauthUserId_fkey" FOREIGN KEY ("unauthUserId") REFERENCES "unauthUserSource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentsNails" ADD CONSTRAINT "AppointmentsNails_masterId_fkey" FOREIGN KEY ("masterId") REFERENCES "Master"("id") ON DELETE CASCADE ON UPDATE CASCADE;
