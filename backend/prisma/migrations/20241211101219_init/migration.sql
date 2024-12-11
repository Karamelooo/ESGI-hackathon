-- CreateTable
CREATE TABLE "Materiel" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "assignedBool" BOOLEAN NOT NULL DEFAULT false,
    "assignedToId" TEXT,
    "assignedToSalleId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Materiel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Materiel" ADD CONSTRAINT "Materiel_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Materiel" ADD CONSTRAINT "Materiel_assignedToSalleId_fkey" FOREIGN KEY ("assignedToSalleId") REFERENCES "Salle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
