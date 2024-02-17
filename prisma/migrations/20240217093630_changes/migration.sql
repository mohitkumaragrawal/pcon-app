/*
  Warnings:

  - A unique constraint covering the columns `[type,userId]` on the table `SocialMediaHandle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SocialMediaHandle_type_userId_key" ON "SocialMediaHandle"("type", "userId");
