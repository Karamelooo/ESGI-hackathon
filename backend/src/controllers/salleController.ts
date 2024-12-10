import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const getAllSalles = async (req: Request, res: Response) => {
  const salles = await prisma.salle.findMany();
  res.status(200).json(salles);
};

export const getSalleById = async (req: Request, res: Response) => {
  const salle = await prisma.salle.findUnique({
    where: { id: req.params.id },
  });
  res.status(200).json(salle);
};

export const createSalle = async (req: Request, res: Response) => {
  const { name, capacite } = req.body;
  const salle = await prisma.salle.create({ data: { name, capacite } });
  res.status(201).json(salle);
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
