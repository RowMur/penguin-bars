/*
  Warnings:

  - You are about to drop the column `flavor` on the `PenguinBar` table. All the data in the column will be lost.
  - Added the required column `flavour` to the `PenguinBar` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PenguinBar" DROP COLUMN "flavor",
ADD COLUMN     "flavour" TEXT NOT NULL;
