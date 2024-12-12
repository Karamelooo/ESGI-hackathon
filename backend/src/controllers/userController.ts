import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";
import bcrypt from 'bcrypt';

export const createUser = async (req: Request, res: Response) => {
  const { email, password, role, name, firstname, address } = req.body;

  if (!["STUDENT", "INTERVENANT"].includes(role)) {
    res.status(400).json({ message: "Invalid role. Use 'STUDENT' or 'INTERVENANT'." });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword, role, name, firstname, address },
    });

    if (role === "STUDENT") {
      await prisma.student.create({
        data: {
          userId: user.id,
        },
      });
    } else if (role === "INTERVENANT") {
      await prisma.intervenant.create({
        data: {
          userId: user.id,
          name,
          firstname,
        },
      });
    }

    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};



export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    if (!user){
        res.status(404).json({ message: "User not found" });
        return
    } 
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { email, password, role, name, firstname, address } = req.body;
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { email, password, role, name, firstname, address },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}


