import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

interface RequestWithFile extends Request {
  file?: Express.Multer.File;
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({ include: { comments: true } });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: req.params.id },
      include: { comments: true },
    });
    if (!post) {
        res.status(404).json({ message: "Post not found" });
        return;
      }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createPost = async (req: RequestWithFile, res: Response) => {
  const { title, content, authorId } = req.body;
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const twelveHoursAgo = new Date();
    twelveHoursAgo.setHours(twelveHoursAgo.getHours() - 12);

    const recentPost = await prisma.post.findFirst({
      where: {
        authorId,
        createdAt: {
          gte: twelveHoursAgo, 
        },
      },
    });

    if (recentPost) {
      res.status(400).json({
        message: "Vous ne pouvez poster qu'un message toutes les 12 heures.",
      });
      return;
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        image,
        authorId,
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};


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

export const deletePost = async (req: Request, res: Response) => {
  try {
    await prisma.post.delete({ where: { id: req.params.id } });
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getLatestPosts = async (req: Request, res: Response) => {
    try {
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: "desc" },
        take: 20,                      
      });
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };