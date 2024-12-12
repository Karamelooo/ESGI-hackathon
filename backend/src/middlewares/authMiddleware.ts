import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken"
import { JwtPayload } from "jsonwebtoken";
import prisma from "../prisma/prismaClient";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        isSuperAdmin: boolean;
        isEtudiant: boolean;
        isIntervenant: boolean;
      };
    }
  }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "No token provided." });
    return;
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Invalid token format." });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const userId = decoded.userId;

    if (!userId) {
      res.status(401).json({ message: "Invalid token payload." });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Etudiant: true, Intervenant: true }
    });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }

    const isEtudiant = user.etudiantId !== null;
    const isIntervenant = user.intervenantId !== null;
    const isSuperAdmin = user.superAdmin === true;

    req.user = {
      id: user.id,
      email: user.email,
      isSuperAdmin: isSuperAdmin,
      isEtudiant: isEtudiant,
      isIntervenant: isIntervenant,
    };

    next();
  } catch (error) {
    console.log(token)
    console.error(error);
    res.status(401).json({ message: "Unauthorized." });
  }
};

export const isEtudiant = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isEtudiant || req.user?.isSuperAdmin) {
    next();
  }
  res.status(403).json({ message: "Access forbidden: User is not an Etudiant." });
};

export const isIntervenant = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isIntervenant || req.user?.isSuperAdmin) {
    next();
  }
  res.status(403).json({ message: "Access forbidden: User is not an Intervenant." });
};

export const isSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isSuperAdmin) {
    next();
  }
  res.status(403).json({ message: "Acces denied: User not superAdmin" });
}