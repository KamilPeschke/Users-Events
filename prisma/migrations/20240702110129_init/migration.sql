-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ATTENDANCE', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ATTENDANCE';