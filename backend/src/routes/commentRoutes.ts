import express from "express";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
} from "../controllers/commentController";

const router = express.Router();

router.get("/posts/:postId/comments", getCommentsByPostId);
router.post("/comments", createComment);
router.delete("/comments/:id", deleteComment);

export default router;
