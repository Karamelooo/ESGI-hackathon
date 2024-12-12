import { Router } from "express";
import express from "express"
import {
  createIntervenant,
  getAllIntervenants,
  getIntervenantById,
  updateIntervenant,
  deleteIntervenant,
} from "../controllers/intervenantController";

const router = Router();

router.post("/intervenants", createIntervenant as express.RequestHandler);
router.get("/intervenants", getAllIntervenants);
router.get("/intervenants/:id", getIntervenantById);
router.put("/intervenants/:id", updateIntervenant as express.RequestHandler);
router.delete("/intervenants/:id", deleteIntervenant);

export default router;
