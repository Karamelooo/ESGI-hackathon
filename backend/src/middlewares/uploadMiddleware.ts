import multer from "multer";
import path from "path";

// Définir le dossier de stockage des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads")); // Dossier où enregistrer les images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`); // Nom unique pour éviter les collisions
  },
});

// Filtrer les fichiers (ex. : uniquement images)
const fileFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Seuls les fichiers images sont autorisés."), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
