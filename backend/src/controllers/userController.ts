import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import prisma from "../prisma/prismaClient";

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email: req.params.email },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { email, password, passwordVerification } = req.body

  try {
    if (!email || !password || !passwordVerification) {
      res.status(422).json({ message: 'Tous les champs sont requis' })
    }

    const emailRegex = /^[\w.]+@[a-z0-9.-]+\.[a-z]{2,}$/i
    if (!emailRegex.test(email)) {
      res.status(422).json({ message: 'L\'adresse email est invalide' })
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{12,}$/
    if (!passwordRegex.test(password)) {
      res.status(422).json({ message: 'Le mot de passe doit contenir au moins 12 caractères, incluant des symboles, des chiffres, des lettres minuscules et majuscules' })
    }

    if (password !== passwordVerification) {
      res.status(422).json({ message: 'Les mots de passe ne correspondent pas' })
    }

    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (user) {
      res.status(409).json({ message: 'Cet utilisateur existe déjà' })
    }

    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword
      },
    });

    res.status(200).json({ message: `Utilisateur créé avec l'adresse email suivante : ${newUser.email}` })
  }
  catch (error) {
    res.status(500).json({ message: error })
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { lastname, firstname, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        lastname,
        firstname,
        email,
        updatedAt: new Date(),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
