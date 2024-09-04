/*
  Warnings:

  - You are about to drop the column `type` on the `deposito_type` table. All the data in the column will be lost.
  - Added the required column `balance` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packet` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "balance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "packet" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "deposito_type" DROP COLUMN "type";
