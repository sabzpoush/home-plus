/*
  Warnings:

  - You are about to drop the `Buyer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Rent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `category` on the `House` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('Sale', 'Buyer', 'Asker', 'Rent');

-- DropForeignKey
ALTER TABLE "Buyer" DROP CONSTRAINT "Buyer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Rent" DROP CONSTRAINT "Rent_userId_fkey";

-- DropForeignKey
ALTER TABLE "Sale" DROP CONSTRAINT "Sale_userId_fkey";

-- AlterTable
ALTER TABLE "House" DROP COLUMN "category",
ADD COLUMN     "category" "CategoryType" NOT NULL;

-- DropTable
DROP TABLE "Buyer";

-- DropTable
DROP TABLE "Rent";

-- DropTable
DROP TABLE "Sale";

-- DropEnum
DROP TYPE "MainType";
