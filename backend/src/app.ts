import express, { Request, Response } from "express";
import corsMiddleware from "./middlewares/corsMiddleware";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import salleRoutes from "./routes/salleRoutes";
import matiereRoutes from "./routes/matiereRoutes";
import promotionRoutes from "./routes/promotionRoutes";
import matiereMappingRoutes from "./routes/matiereMappingRoutes";
import intervenantRoutes from "./routes/intervenantRoutes";
import indisponibiliteRoutes from "./routes/indisponibiliteRoutes";
import courseRoutes from "./routes/courseRoutes";
import pauseRoutes from "./routes/pauseRoutes";
import periodeRoutes from "./routes/periodeRoutes";
import authRoutes from "./routes/authRoutes";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import prisma from "./prisma/prismaClient";
import bcrypt from "bcrypt";

const app = express();

// JSON
app.use(express.json());

// CORS
app.use(corsMiddleware);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use(userRoutes);
app.use(postRoutes);
app.use(commentRoutes);
app.use(salleRoutes);
app.use(matiereRoutes);
app.use(promotionRoutes);
app.use(matiereMappingRoutes);
app.use(intervenantRoutes);
app.use(indisponibiliteRoutes);
app.use(courseRoutes);
app.use(pauseRoutes);
app.use(periodeRoutes);
app.use(authRoutes);

async function createSuperAdmin() {
  const superAdmin = await prisma.user.findFirst({
    where: { role: 'SUPERADMIN' },
  });

  if (!superAdmin) {
    await prisma.user.create({
      data: {
        email: 'superadmin@example.com',
        password: bcrypt.hashSync('securepassword', 10), 
        role: 'SUPERADMIN',
        name: 'Super',
        firstname: 'Admin',
        address: 'Main Office',
      },
    });
  }
}
createSuperAdmin()

app.get("/", (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "API is working" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

export default app;
