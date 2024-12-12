import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createMatiere = async (req: Request, res: Response) => {
  try {
    const { name, semester, color } = req.body;
    const matiere = await prisma.matiere.create({
      data: { name, semester, color },
    });
    res.status(201).json(matiere);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllMatieres = async (req: Request, res: Response) => {
  try {
    const matieres = await prisma.matiere.findMany();
    res.status(200).json(matieres);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getMatiereById = async (req: Request, res: Response) => {
  try {
    const matiere = await prisma.matiere.findUnique({
      where: { id: req.params.id },
    });
    if (!matiere){
        res.status(404).json({ message: "Matiere not found" });
        return
    } 
    res.status(200).json(matiere);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateMatiere = async (req: Request, res: Response) => {
  try {
    const { name, semester, color } = req.body;
    const matiere = await prisma.matiere.update({
      where: { id: req.params.id },
      data: { name, semester, color },
    });
    res.status(200).json(matiere);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteMatiere = async (req: Request, res: Response) => {
  try {
    await prisma.matiere.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
