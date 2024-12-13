import { Router } from "express";
import {
  createPeriode,
  getAllPeriodes,
  getPeriodeById,
  updatePeriode,
  deletePeriode,
} from "../controllers/periodeController";

const router = Router();

router.post("/periodes", createPeriode);
router.get("/periodes", getAllPeriodes);
router.get("/periodes/:id", getPeriodeById);
router.put("/periodes/:id", updatePeriode);
router.delete("/periodes/:id", deletePeriode);

export default router;
