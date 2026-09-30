/*
  Warnings:

  - You are about to drop the column `code` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Offer` table. All the data in the column will be lost.
  - Made the column `description` on table `Offer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Offer_code_key";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "code",
DROP COLUMN "discount",
DROP COLUMN "startDate",
ADD COLUMN     "badge" TEXT NOT NULL DEFAULT 'Limited Time',
ADD COLUMN     "buttonText" TEXT NOT NULL DEFAULT 'Order Now',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '/offerFood.png',
ALTER COLUMN "updatedAt" DROP DEFAULT,
ALTER COLUMN "description" SET NOT NULL;
