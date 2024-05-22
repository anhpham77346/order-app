/*
  Warnings:

  - A unique constraint covering the columns `[stringCode]` on the table `Table` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Table_stringCode_key` ON `Table`(`stringCode`);
