-- CreateEnum
CREATE TYPE "MainType" AS ENUM ('Sale', 'Buyer', 'Asker', 'Rent');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('Eco', 'DailyRent', 'Apartment', 'Pilot', 'Basement', 'Land', 'Resident', 'Rent');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "name" TEXT,
    "title" TEXT,
    "phone" TEXT,
    "registerDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "Liked" TEXT[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "House" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER,
    "mortgage" INTEGER,
    "rent" INTEGER,
    "sellerName" TEXT,
    "phone" TEXT NOT NULL,
    "detail" TEXT,
    "fromMeter" INTEGER,
    "toMeter" INTEGER,
    "room" INTEGER,
    "fromBuildYear" INTEGER,
    "toBuildYear" INTEGER,
    "tag" TEXT[],
    "submitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "type" "PropertyType" NOT NULL,
    "mainType" "MainType" NOT NULL,
    "watchCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "House_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER,
    "sellerName" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "detail" TEXT,
    "meterage" INTEGER,
    "room" INTEGER,
    "buildYear" INTEGER,
    "floor" INTEGER,
    "countFloor" INTEGER,
    "parking" BOOLEAN,
    "elvator" BOOLEAN,
    "warehouse" BOOLEAN,
    "tag" TEXT[],
    "submitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "type" "PropertyType" NOT NULL,
    "mainType" TEXT NOT NULL DEFAULT 'Sale',
    "watchCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Buyer" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER,
    "mortgage" INTEGER,
    "rent" INTEGER,
    "sellerName" TEXT,
    "phone" TEXT NOT NULL,
    "detail" TEXT,
    "fromMeter" INTEGER,
    "toMeter" INTEGER,
    "room" INTEGER,
    "fromBuildYear" INTEGER,
    "toBuildYear" INTEGER,
    "tag" TEXT[],
    "submitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "type" "PropertyType" NOT NULL,
    "mainType" TEXT NOT NULL DEFAULT 'Buyer',
    "property" "PropertyType"[],
    "watchCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Buyer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rent" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "mortgage" INTEGER,
    "rent" INTEGER,
    "owner" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT,
    "detail" TEXT,
    "meterage" INTEGER,
    "room" INTEGER,
    "buildYear" INTEGER,
    "floor" INTEGER,
    "countFloor" INTEGER,
    "parking" BOOLEAN,
    "elvator" BOOLEAN,
    "tag" TEXT[],
    "submitedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "type" "PropertyType" NOT NULL DEFAULT 'Rent',
    "mainType" TEXT NOT NULL DEFAULT 'Rent',
    "watchCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Rent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "House_id_key" ON "House"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Sale_id_key" ON "Sale"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Buyer_id_key" ON "Buyer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Rent_id_key" ON "Rent"("id");

-- AddForeignKey
ALTER TABLE "House" ADD CONSTRAINT "House_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Buyer" ADD CONSTRAINT "Buyer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rent" ADD CONSTRAINT "Rent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
