import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.get("/users", authMiddleware(['SUPERADMIN']), getAllUsers);
router.get("/users/:id", getUserById);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;

