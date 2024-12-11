import express from "express";
import {
  createSalle,
  deleteSalle,
  getAllSalles,
  getSalleById,
  updateSalle,
} from "../controllers/salleController";

const router = express.Router();

router.get("/salles", getAllSalles);
router.get("/salles/:id", getSalleById);
router.post("/salles", createSalle);
router.put("/salles/:id", updateSalle);
router.delete("/salles/:id", deleteSalle);

export default router;
