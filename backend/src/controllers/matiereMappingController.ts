import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createMatiereMapping = async (req: Request, res: Response) => {
  try {
    const { matiereId, promotionId, intervenantId, volumeHeure } = req.body;
    const matiereMapping = await prisma.matiereMapping.create({
      data: { matiereId, promotionId, intervenantId, volumeHeure },
    });
    res.status(201).json(matiereMapping);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllMatiereMappings = async (req: Request, res: Response) => {
  try {
    const mappings = await prisma.matiereMapping.findMany({
      include: { matiere: true, promotion: true },
    });
    res.status(200).json(mappings);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getMatiereMappingById = async (req: Request, res: Response) => {
  try {
    const mapping = await prisma.matiereMapping.findUnique({
      where: { id: req.params.id },
      include: { matiere: true, promotion: true },
    });
    if (!mapping){
        res.status(404).json({ message: "MatiereMapping not found" });
        return
    }
    res.status(200).json(mapping);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateMatiereMapping = async (req: Request, res: Response) => {
  try {
    const { volumeHeure } = req.body;
    const mapping = await prisma.matiereMapping.update({
      where: { id: req.params.id },
      data: { volumeHeure },
    });
    res.status(200).json(mapping);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteMatiereMapping = async (req: Request, res: Response) => {
  try {
    await prisma.matiereMapping.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
