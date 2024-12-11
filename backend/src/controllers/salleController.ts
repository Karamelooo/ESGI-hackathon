import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const getAllSalles = async (req: Request, res: Response) => {
  try {
    const salles = await prisma.salle.findMany();
    res.status(200).json(salles);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getSalleById = async (req: Request, res: Response) => {
  const salle = await prisma.salle.findUnique({
    where: { id: req.params.id },
  });
  res.status(200).json(salle);
};

export const createSalle = async (req: Request, res: Response) => {
  try {
    const { name, capacite } = req.body;

    const salleExistante = await prisma.salle.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    });

    if (salleExistante) {
      return res.status(400).json({ 
        message: 'Une salle avec ce nom existe déjà' 
      });
    }

    const salle = await prisma.salle.create({ 
      data: { name, capacite } 
    });

    res.status(201).json(salle);
  } catch (error) {
    res.status(500).json({ 
      message: (error as Error).message 
    });
  }
};

export const updateSalle = async (req: Request, res: Response) => {
  const { name, capacite } = req.body;
  const salle = await prisma.salle.update({
    where: { id: req.params.id },
    data: { name, capacite },
  });
  res.status(200).json(salle);
};

export const deleteSalle = async (req: Request, res: Response) => {
  const salle = await prisma.salle.delete({
    where: { id: req.params.id },
  });
  res.status(200).json(salle);
};
