/*
  Warnings:

  - Added the required column `startdate` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "startdate" TIMESTAMP(3) NOT NULL;
