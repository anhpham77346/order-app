/*
  Warnings:

  - You are about to alter the column `availability` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `availability` BOOLEAN NOT NULL;
