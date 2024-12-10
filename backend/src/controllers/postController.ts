import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

// Get all posts
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({ include: { comments: true } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { comments: true },
    });
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Create a new post
export const createPost = async (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;

  try {
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Update an existing post
export const updatePost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  try {
    const post = await prisma.post.update({
      where: { id: req.params.id },
      data: { title, content },
    });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Delete a post
export const deletePost = async (req: Request, res: Response) => {
  try {
    await prisma.post.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
