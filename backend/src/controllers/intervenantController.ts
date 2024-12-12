import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createIntervenant = async (req: Request, res: Response) => {
    const { userId, name, firstname } = req.body;
  
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
    const intervenant = await prisma.intervenant.create({
            data: { userId, name, firstname },
        });
  
      res.status(201).json(intervenant);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  

export const getAllIntervenants = async (_req: Request, res: Response) => {
  try {
    const intervenants = await prisma.intervenant.findMany();
    res.status(200).json(intervenants);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getIntervenantById = async (req: Request, res: Response) => {
  try {
    const intervenant = await prisma.intervenant.findUnique({
      where: { id: req.params.id },
    });
    if (!intervenant){
        res.status(404).json({ message: "Intervenant not found" });
        return
    } 
    res.status(200).json(intervenant);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateIntervenant = async (req: Request, res: Response) => {
    const { id } = req.params; 
    const { userId, name, firstname } = req.body; 
  
    try {
      if (userId) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        });
  
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
      }
  
      const intervenant = await prisma.intervenant.update({
        where: { id },
        data: { userId, name, firstname },
      });
  
      res.status(200).json(intervenant)
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
  
  

export const deleteIntervenant = async (req: Request, res: Response) => {
  try {
    await prisma.intervenant.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
