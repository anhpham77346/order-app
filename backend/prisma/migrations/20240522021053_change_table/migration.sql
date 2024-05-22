/*
  Warnings:

  - You are about to drop the column `tableToOrdersId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Table` table. All the data in the column will be lost.
  - Added the required column `tableId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_tableToOrdersId_fkey`;

-- DropForeignKey
ALTER TABLE `Table` DROP FOREIGN KEY `Table_orderId_fkey`;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `tableToOrdersId`,
    ADD COLUMN `tableId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Table` DROP COLUMN `orderId`,
    ADD COLUMN `isActive` BOOLEAN NOT NULL;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `Table`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
