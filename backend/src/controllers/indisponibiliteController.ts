import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createIndisponibilite = async (req: Request, res: Response) => {
  const { start, end, intervenantId } = req.body;
  try {
    const indisponibilite = await prisma.indisponibilite.create({
      data: { start, end, intervenantId },
    });
    res.status(201).json(indisponibilite);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllIndisponibilites = async (_req: Request, res: Response) => {
  try {
    const indisponibilites = await prisma.indisponibilite.findMany();
    res.status(200).json(indisponibilites);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getIndisponibiliteById = async (req: Request, res: Response) => {
  try {
    const indisponibilite = await prisma.indisponibilite.findUnique({
      where: { id: req.params.id },
    });
    if (!indisponibilite){
        res.status(404).json({ message: "Indisponibilité not found" });
        return
    } 
    res.status(200).json(indisponibilite);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateIndisponibilite = async (req: Request, res: Response) => {
  const { start, end } = req.body;
  try {
    const indisponibilite = await prisma.indisponibilite.update({
      where: { id: req.params.id },
      data: { start, end },
    });
    res.status(200).json(indisponibilite);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteIndisponibilite = async (req: Request, res: Response) => {
  try {
    await prisma.indisponibilite.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
