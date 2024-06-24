/*
  Warnings:

  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `OrderProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "total" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "OrderProduct" ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "total" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);
