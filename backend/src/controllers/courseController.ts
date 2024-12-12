import { Request, Response } from "express";
import prisma from "../prisma/prismaClient";

export const createCourse = async (req: Request, res: Response) => {
  const { start, end, intervenantId, salleId, matiereMappingId, promotionId } = req.body;
  try {
    const course = await prisma.course.create({
      data: { start, end, intervenantId, salleId, matiereMappingId, promotionId },
    });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAllCourses = async (_req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
    });
    if (!course){
        res.status(404).json({ message: "Course not found" });
        return
    } 
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  const { start, end, intervenantId, salleId, matiereMappingId, promotionId } = req.body;
  try {
    const course = await prisma.course.update({
      where: { id: req.params.id },
      data: { start, end, intervenantId, salleId, matiereMappingId, promotionId },
    });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    await prisma.course.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCourseIntervenant = async (req: Request, res: Response) => {
  try {
    const courses = await prisma.course.findMany({
      where: { intervenantId: req.params.intervenantId }
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};