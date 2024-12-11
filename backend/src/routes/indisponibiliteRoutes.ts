import { Router } from "express";
import {
  createIndisponibilite,
  getAllIndisponibilites,
  getIndisponibiliteById,
  updateIndisponibilite,
  deleteIndisponibilite,
} from "../controllers/indisponibiliteController";

const router = Router();

router.post("/indisponibilites", createIndisponibilite);
router.get("/indisponibilites", getAllIndisponibilites);
router.get("/indisponibilites/:id", getIndisponibiliteById);
router.put("/indisponibilites/:id", updateIndisponibilite);
router.delete("/indisponibilites/:id", deleteIndisponibilite);

export default router;
