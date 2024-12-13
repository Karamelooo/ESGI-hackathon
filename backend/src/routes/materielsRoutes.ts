import express from "express";
import {
  getAllMateriels,
  getMaterielById,
  createMateriel,
  updateMateriel,
  deleteMateriel,
} from "../controllers/materielController";

const router = express.Router();

router.get("/materiels", getAllMateriels as express.RequestHandler);
router.get("/materiels/:id", getMaterielById as express.RequestHandler);
router.post("/materiels", createMateriel as express.RequestHandler);
router.put("/materiels/:id", updateMateriel as express.RequestHandler);
router.delete("/materiels/:id", deleteMateriel as express.RequestHandler);

export default router;

