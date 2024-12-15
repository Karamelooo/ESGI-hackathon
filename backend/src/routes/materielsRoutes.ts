import express from "express";
import {
  getAllMateriels,
  getMaterielById,
  createMateriel,
  updateMateriel,
  deleteMateriel,
} from "../controllers/materielController";

const router = express.Router();



export default router;

