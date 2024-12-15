import { Router } from "express";
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getCourseIntervenant,
  createMultipleCourses,
  updateMultipleCourses
} from "../controllers/courseController";

const router = Router();

router.get("/courses/intervenant/:intervenantId", getCourseIntervenant)
router.post("/courses/multiple", createMultipleCourses);
router.post("/courses/update-multiple", updateMultipleCourses);
router.post("/courses", createCourse);
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);

export default router;
