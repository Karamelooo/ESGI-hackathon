import express from "express";
import {
  getAllPosts,
  createPost,
  updatePost,
  getPostById,
  deletePost,
  getLatestPosts
} from "../controllers/postController";
import upload from "../middlewares/uploadMiddleware";

const router = express.Router();

router.get("/posts/latest", getLatestPosts);
router.get("/posts", getAllPosts);
router.get("/posts/:id", getPostById);
router.post("/posts", upload.single("image"), createPost);
router.put("/posts/:id", upload.single("image"), updatePost);
router.delete("/posts/:id", deletePost);

export default router;
