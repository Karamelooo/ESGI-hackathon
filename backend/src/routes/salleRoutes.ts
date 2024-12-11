import express from "express";
import {
  createSalle,
  deleteSalle,
  getAllSalles,
  getSalleById,
  updateSalle,
} from "../controllers/salleController";

const router = express.Router();

router.get("/salles", getAllSalles as express.RequestHandler);
router.get("/salles/:id", getSalleById as express.RequestHandler);
router.post("/salles", createSalle as express.RequestHandler);
router.put("/salles/:id", updateSalle as express.RequestHandler);
router.delete("/salles/:id", deleteSalle as express.RequestHandler);

export default router;

