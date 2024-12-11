import type { Request, Response } from 'express'
import process from 'node:process'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../prisma/prismaClient'

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(422).json({ message: 'Tous les champs sont requis' })
      return
    }

    const user = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!user) {
      res.status(409).json({ message: 'Aucune correspondance trouvée' });
      return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      res.status(409).json({ message: 'Aucune correspondance trouvée' })
    }
    const token = jwt.sign({ userId: user?.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' })
    res.status(200).json({ message: 'Connexion réussie', token })
  }
  catch (error) {
    res.status(500).json({ message: error })
  }
}

export async function logout(req: Request, res: Response) {
  try {
    delete req.headers.authorization

    res.status(200).json({ message: 'Déconnexion réussie' })
  }
  catch (error: any) {
    res.status(500).json({ message: error.message || 'Erreur lors de la déconnexion' })
  }
}