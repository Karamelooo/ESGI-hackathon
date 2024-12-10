import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

// Get all comments for a specific post
export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: req.params.postId },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Create a comment
export const createComment = async (req: Request, res: Response) => {
  const { content, postId, authorId } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: { content, postId, authorId },
    });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Delete a comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    await prisma.comment.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
