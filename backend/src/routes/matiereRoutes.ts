import express from "express";
import {
  createMatiere,
  getAllMatieres,
  getMatiereById,
  updateMatiere,
  deleteMatiere,
} from "../controllers/matiereController";

const router = express.Router();

router.post("/matieres", createMatiere);
router.get("/matieres", getAllMatieres);
router.get("/matieres/:id", getMatiereById);
router.put("/matieres/:id", updateMatiere);
router.delete("/matieres/:id", deleteMatiere);

export default router;
