import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getUserByEmail
} from "../controllers/userController";

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/user/:email", getUserByEmail);
router.post("/users", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;

