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
    const courses = await prisma.course.findMany({
      include: { intervenant: true, Salle: true, matiereMapping: {
        include: { matiere: true, promotion: true }
      }, Promotion: true },
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: { intervenant: true, Salle: true, matiereMapping: {
        include: { matiere: true, promotion: true }
      }, Promotion: true },
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
      where: { intervenantId: req.params.intervenantId },
      include: { intervenant: true, Salle: true, matiereMapping: {
        include: { matiere: true, promotion: true }
      }, Promotion: true },
    });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createMultipleCourses = async (req: Request, res: Response) => {
  const { courses } = req.body;
  const promotionId = req.query.promotionId as string;

  if (!Array.isArray(courses)) {
    res.status(400).json({ message: "Invalid input, 'courses' must be an array." });
    return;
  }

  try {
    const createdCourses = await prisma.$transaction(async (prisma) => {
      if (promotionId && promotionId !== 'all') {
        await prisma.course.deleteMany({
          where: {
            promotionId: promotionId
          }
        });
      } else {
        await prisma.course.deleteMany({});
      }

      return await Promise.all(
        courses.map((course) =>
          prisma.course.create({
            data: {
              start: new Date(course.start).toISOString(),
              end: new Date(course.end).toISOString(), 
              intervenantId: course.intervenantId,
              salleId: course.salleId,
              matiereMappingId: course.matiereMappingId,
              promotionId: course.promotionId,
            },
          })
        )
      );
    });

    res.status(201).json({
      message: "Courses created successfully",
      courses: createdCourses,
    });
  } catch (error) {
    res.status(500).json({ 
      message: (error as Error).message,
      error: error
    });
  }
};

export const updateMultipleCourses = async (req: Request, res: Response) => {
  const { courses } = req.body;

  if (!Array.isArray(courses)) {
    res.status(400).json({ message: "Invalid input, 'courses' must be an array." });
    return;
  }

  try {
    const updatedCourses = await prisma.$transaction(
      courses.map((course) =>
        prisma.course.update({
          where: { id: course.id },
          data: {
            start: new Date(course.start).toISOString(),
            end: new Date(course.end).toISOString(),
            intervenantId: course.intervenantId,
            salleId: course.salleId,
            matiereMappingId: course.matiereMappingId,
            promotionId: course.promotionId,
          },
        })
      )
    );

    res.status(200).json({
      message: "Courses updated successfully",
      courses: updatedCourses,
    });
  } catch (error) {
    res.status(500).json({ 
      message: (error as Error).message,
      receivedData: courses,
      error: error
    });
  }
};