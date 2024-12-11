import { Request, Response, NextFunction } from "express";
import { jwt, JwtPayload } from "jsonwebtoken";
import prisma from "../prisma/prismaClient";


// Vous pouvez définir une interface pour le request augmentée
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
    return res.status(401).json({ message: "No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ message: "Invalid token format." });
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as JwtPayload;

    const userId = decoded.userId;
    
    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload." });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { Etudiant: true, Intervenant: true }
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
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
    console.error(error);
    return res.status(401).json({ message: "Unauthorized." });
  }
};