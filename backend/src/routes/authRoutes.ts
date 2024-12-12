import express from "express";
import { login, logout, testAuth } from "../controllers/authController";
import { authMiddleware, isEtudiant } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/login", login);
router.get("/logout", logout);
router.get("/testauth", authMiddleware, isEtudiant, testAuth);

export default router;