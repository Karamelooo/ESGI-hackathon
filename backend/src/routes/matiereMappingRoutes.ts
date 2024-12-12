import express from "express";
import {
  createMatiereMapping,
  getAllMatiereMappings,
  getMatiereMappingById,
  updateMatiereMapping,
  deleteMatiereMapping,
} from "../controllers/matiereMappingController";

const router = express.Router();

router.post("/matieres-mapping", createMatiereMapping);
router.get("/matieres-mapping", getAllMatiereMappings);
router.get("/matieres-mapping/:id", getMatiereMappingById);
router.put("/matieres-mapping/:id", updateMatiereMapping);
router.delete("/matieres-mapping/:id", deleteMatiereMapping);

export default router;
