/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Customer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Deposito_Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_deposito_type_fkey";

-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_id_customer_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Customer";

-- DropTable
DROP TABLE "Deposito_Type";

-- CreateTable
CREATE TABLE "customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" SERIAL NOT NULL,
    "id_customer" INTEGER NOT NULL,
    "deposito_Type" INTEGER NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposito_type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "yearly_return" INTEGER NOT NULL,

    CONSTRAINT "deposito_type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "account_deposito_Type_key" ON "account"("deposito_Type");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_deposito_Type_fkey" FOREIGN KEY ("deposito_Type") REFERENCES "deposito_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
