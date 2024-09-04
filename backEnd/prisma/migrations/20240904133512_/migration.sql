/*
  Warnings:

  - You are about to drop the column `deposito_Type` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[packet]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `packet` on the `account` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_deposito_Type_fkey";

-- DropIndex
DROP INDEX "account_deposito_Type_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "deposito_Type",
DROP COLUMN "packet",
ADD COLUMN     "packet" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_packet_key" ON "account"("packet");

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_packet_fkey" FOREIGN KEY ("packet") REFERENCES "deposito_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
