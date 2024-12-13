import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/userController";
import {authMiddleware} from '../middlewares/authMiddleware';

const router = express.Router();

router.get("/users", authMiddleware(['SUPERADMIN']), getAllUsers);
router.get("/users/:id", authMiddleware(['SUPERADMIN']), getUserById);
router.post("/users", authMiddleware(['SUPERADMIN']), createUser);
router.put("/users/:id", authMiddleware(['SUPERADMIN']), updateUser);
router.delete("/users/:id", authMiddleware(['SUPERADMIN']), deleteUser);

export default router;

