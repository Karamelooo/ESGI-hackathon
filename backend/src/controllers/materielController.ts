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
  const { name, userId, salleId } = req.body;
  const materiel = await prisma.materiel.create({ data: { name, userId, salleId } });
  res.status(201).json(materiel);
};

export const updateMateriel = async (req: Request, res: Response) => {
  const { name, selectedId, type, assignedBool } = req.body;

  if (type == "CLASSE") {
    const materiel = await prisma.materiel.update({ where: { id: req.params.id }, data: { salleId: selectedId, assignedBool: assignedBool } });
    res.status(200).json(materiel);
  } else if (type == "USER") {
    const materiel = await prisma.materiel.update({ where: { id: req.params.id }, data: { userId: selectedId, assignedBool: assignedBool } });
    res.status(200).json(materiel);
  } else {
    res.status(404).json({ message: "type non connue" });
  }

};

export const deleteMateriel = async (req: Request, res: Response) => {
  await prisma.materiel.delete({ where: { id: req.params.id } });
  res.status(204).send();
};

export const assignMaterielToSalle = async (req: Request, res: Response) => {
  const { materielId, salleId } = req.body;
  const materiel = await prisma.materiel.update({ where: { id: materielId }, data: { salleId } });
  res.status(200).json(materiel);
};

export const unassignMaterielFromSalle = async (req: Request, res: Response) => {
  const { materielId } = req.body;
  const materiel = await prisma.materiel.update({ where: { id: materielId }, data: { salleId: null } });
  res.status(200).json(materiel);
};

export const getMaterielsByUserId = async (req: Request, res: Response) => {
  const materiels = await prisma.materiel.findMany({ where: { userId: req.params.userId } });
  res.status(200).json(materiels);
};

export const getMaterielsBySalleId = async (req: Request, res: Response) => {
  const materiels = await prisma.materiel.findMany({ where: { salleId: req.params.salleId } });
  res.status(200).json(materiels);
};
