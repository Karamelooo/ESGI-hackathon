import express, { Request, Response } from "express";
import corsMiddleware from "./middlewares/corsMiddleware";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import salleRoutes from "./routes/salleRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
import path from "path";
import bcrypt from "bcrypt";
import prisma from "./prisma/prismaClient";
import cors from "cors";
import { Prisma } from "@prisma/client";

dotenv.config();

const app = express();

// JSON
app.use(express.json());

// CORS
app.use(cors({ origin: 'http://localhost:3000' }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(salleRoutes);
app.use(authRoutes);

// test api
app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

const initialisation = async () => {
  // initialisation de l'utilisateur superadmin
  try {
    const passwordHashed = await bcrypt.hash("admin", 10)
    await prisma.user.upsert({
      where: { email: 'user@example.com' },
      create: {
        lastname: 'Super',
        firstname: 'Admin',
        email: 'user@example.com',
        superAdmin: true,
        password: passwordHashed,
      },
      update: {},
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Handle known errors
      if (error.code === 'P2002') {
        console.error('Unique constraint violation: A user with this email already exists.');
      } else {
        console.error(`Prisma error code ${error.code}: ${error.message}`);
      }
    } else {
      console.error(error)
    }
  }
}

initialisation()

export default app;
