import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createPeriode = async (req: Request, res: Response) => {
  const { start, end, promotionId } = req.body;
  try {
    const periode = await prisma.periode.create({
      data: { start, end, promotionId },
    });
    res.status(201).json(periode);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllPeriodes = async (_req: Request, res: Response) => {
  try {
    const periodes = await prisma.periode.findMany();
    res.status(200).json(periodes);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPeriodeById = async (req: Request, res: Response) => {
  try {
    const periode = await prisma.periode.findUnique({
      where: { id: req.params.id },
    });
    if (!periode){
        res.status(404).json({ message: "Periode not found" });
        return
    } 
    res.status(200).json(periode);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePeriode = async (req: Request, res: Response) => {
  const { start, end } = req.body;
  try {
    const periode = await prisma.periode.update({
      where: { id: req.params.id },
      data: { start, end },
    });
    res.status(200).json(periode);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePeriode = async (req: Request, res: Response) => {
  try {
    await prisma.periode.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};