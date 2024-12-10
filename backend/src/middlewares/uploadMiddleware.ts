import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

// Définition du moteur de stockage
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, path.join(__dirname, "../../uploads/")); // Chemin du dossier "uploads"
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

// Configuration de Multer avec les options
const upload = multer({ storage });

export default upload;
