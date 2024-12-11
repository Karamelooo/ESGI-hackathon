import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createPromotion = async (req: Request, res: Response) => {
  try {
    const { name, students } = req.body;
    const promotion = await prisma.promotion.create({
      data: { name, students },
    });
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllPromotions = async (req: Request, res: Response) => {
  try {
    const promotions = await prisma.promotion.findMany();
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPromotionById = async (req: Request, res: Response) => {
  try {
    const promotion = await prisma.promotion.findUnique({
      where: { id: req.params.id },
    });
    if (!promotion){
        res.status(404).json({ message: "Promotion not found" });
        return 
    }
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePromotion = async (req: Request, res: Response) => {
  try {
    const { name, students } = req.body;
    const promotion = await prisma.promotion.update({
      where: { id: req.params.id },
      data: { name, students },
    });
    res.status(200).json(promotion);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePromotion = async (req: Request, res: Response) => {
  try {
    await prisma.promotion.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
