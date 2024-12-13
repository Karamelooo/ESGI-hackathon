import express from 'express';
import { login } from '../controllers/authController';
import { createUser } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/login', login);

export default router;
