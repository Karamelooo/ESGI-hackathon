/*
  Warnings:

  - You are about to drop the column `assignedBool` on the `Materiel` table. All the data in the column will be lost.
  - You are about to drop the column `assignedToId` on the `Materiel` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Materiel` table. All the data in the column will be lost.
  - You are about to drop the `_MaterielToSalle` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `mappingMateriel` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Materiel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Materiel" DROP CONSTRAINT "Materiel_assignedToId_fkey";

-- DropForeignKey
ALTER TABLE "_MaterielToSalle" DROP CONSTRAINT "_MaterielToSalle_A_fkey";

-- DropForeignKey
ALTER TABLE "_MaterielToSalle" DROP CONSTRAINT "_MaterielToSalle_B_fkey";

-- DropForeignKey
ALTER TABLE "mappingMateriel" DROP CONSTRAINT "mappingMateriel_materiel_fkey";

-- DropForeignKey
ALTER TABLE "mappingMateriel" DROP CONSTRAINT "mappingMateriel_referenceId_fkey";

-- AlterTable
ALTER TABLE "Materiel" DROP COLUMN "assignedBool",
DROP COLUMN "assignedToId",
DROP COLUMN "description",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "salleId" TEXT,
ADD COLUMN     "userId" TEXT;

-- DropTable
DROP TABLE "_MaterielToSalle";

-- DropTable
DROP TABLE "mappingMateriel";

-- DropEnum
DROP TYPE "TypeMapping";

-- AddForeignKey
ALTER TABLE "Materiel" ADD CONSTRAINT "Materiel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materiel" ADD CONSTRAINT "Materiel_salleId_fkey" FOREIGN KEY ("salleId") REFERENCES "Salle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
