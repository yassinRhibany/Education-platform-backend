/*
  Warnings:

  - You are about to drop the `Subject` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `subject` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('MATH', 'PHYSICS', 'CHEMISTRY', 'BIOLOGY', 'ENGLISH', 'ARABIC', 'HISTORY', 'GEOGRAPHY', 'COMPUTER_SCIENCE', 'ART');

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_subjectId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "subject" "Subject" NOT NULL;

-- DropTable
DROP TABLE "Subject";
