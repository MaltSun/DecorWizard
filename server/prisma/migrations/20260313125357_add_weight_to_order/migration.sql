/*
  Warnings:

  - Added the required column `quantity` to the `order_catalog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_catalog" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL DEFAULT 0;
