import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const getAllMateriels = async (req: Request, res: Response) => {
  const materiels = await prisma.materiel.findMany();
  res.status(200).json(materiels);
};

export const getMaterielById = async (req: Request, res: Response) => {
  const materiel = await prisma.materiel.findUnique({
    where: { id: req.params.id },
  });
  res.status(200).json(materiel);
};

export const createMateriel = async (req: Request, res: Response) => {
  const { description, assignedBool, assignedToId, assignedToSalleId } = req.body;
  const materiel = await prisma.materiel.create({ data: { description, assignedBool, assignedToId, assignedToSalleId } });
  res.status(201).json(materiel);
};

export const updateMateriel = async (req: Request, res: Response) => {
  const { description, assignedBool, assignedToId, assignedToSalleId } = req.body;
  const materiel = await prisma.materiel.update({ where: { id: req.params.id }, data: { description, assignedBool, assignedToId, assignedToSalleId } });
  res.status(200).json(materiel);
};

export const deleteMateriel = async (req: Request, res: Response) => {
  await prisma.materiel.delete({ where: { id: req.params.id } });
  res.status(204).send();
};
