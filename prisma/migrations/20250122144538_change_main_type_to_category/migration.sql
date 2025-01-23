/*
  Warnings:

  - You are about to drop the column `mainType` on the `House` table. All the data in the column will be lost.
  - Added the required column `category` to the `House` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "House" DROP COLUMN "mainType",
ADD COLUMN     "category" "MainType" NOT NULL;
