/*
  Warnings:

  - You are about to drop the column `assignedToSalleId` on the `Materiel` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TypeMapping" AS ENUM ('SALLE', 'MATERIEL');

-- DropForeignKey
ALTER TABLE "Materiel" DROP CONSTRAINT "Materiel_assignedToSalleId_fkey";

-- AlterTable
ALTER TABLE "Materiel" DROP COLUMN "assignedToSalleId";

-- CreateTable
CREATE TABLE "mappingMateriel" (
    "id" TEXT NOT NULL,
    "type" "TypeMapping" NOT NULL,
    "referenceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mappingMateriel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MaterielToSalle" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MaterielToSalle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MaterielToSalle_B_index" ON "_MaterielToSalle"("B");

-- AddForeignKey
ALTER TABLE "mappingMateriel" ADD CONSTRAINT "mappingMateriel_referenceId_fkey" FOREIGN KEY ("referenceId") REFERENCES "Salle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mappingMateriel" ADD CONSTRAINT "mappingMateriel_materiel_fkey" FOREIGN KEY ("referenceId") REFERENCES "Materiel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterielToSalle" ADD CONSTRAINT "_MaterielToSalle_A_fkey" FOREIGN KEY ("A") REFERENCES "Materiel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MaterielToSalle" ADD CONSTRAINT "_MaterielToSalle_B_fkey" FOREIGN KEY ("B") REFERENCES "Salle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
