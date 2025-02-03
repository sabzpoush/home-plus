/*
  Warnings:

  - The values [Resident] on the enum `PropertyType` will be removed. If these variants are still used in the database, this will fail.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PropertyType_new" AS ENUM ('Eco', 'DailyRent', 'Apartment', 'Pilot', 'Basement', 'Land', 'Vila', 'Rent');
ALTER TABLE "House" ALTER COLUMN "type" TYPE "PropertyType_new" USING ("type"::text::"PropertyType_new");
ALTER TYPE "PropertyType" RENAME TO "PropertyType_old";
ALTER TYPE "PropertyType_new" RENAME TO "PropertyType";
DROP TYPE "PropertyType_old";
COMMIT;

-- AlterTable
ALTER TABLE "House" ADD COLUMN     "elevator" BOOLEAN,
ADD COLUMN     "parking" BOOLEAN,
ADD COLUMN     "warehouse" BOOLEAN,
ALTER COLUMN "phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;
