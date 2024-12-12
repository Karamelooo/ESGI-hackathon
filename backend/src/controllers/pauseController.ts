import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createPause = async (req: Request, res: Response) => {
  const { start, end, description } = req.body;
  try {
    const pause = await prisma.pause.create({
      data: { start, end, description },
    });
    res.status(201).json(pause);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllPauses = async (_req: Request, res: Response) => {
  try {
    const pauses = await prisma.pause.findMany();
    res.status(200).json(pauses);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPauseById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const pause = await prisma.pause.findUnique({ where: { id } });
    res.status(200).json(pause);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePause = async (req: Request, res: Response) => {
  const { start, end, description } = req.body;
  try {
    const pause = await prisma.pause.update({
      where: { id: req.params.id },
      data: { start, end, description },
    });
    res.status(200).json(pause);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePause = async (req: Request, res: Response) => {
  try {
    await prisma.pause.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};