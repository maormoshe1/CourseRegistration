import { Router, Request, Response } from "express";
import {
  createCourse,
  createDate,
  getAllCourses,
} from "../modules/Courses/handler";

const coursesRouter = Router();

//get all courses
coursesRouter.get("/", (req: Request, res: Response) => {
  return getAllCourses(req, res);
});

//add new course
coursesRouter.post("/", (req: Request, res: Response) => {
  return createCourse(req, res);
});

//add new date for specific course
coursesRouter.put("/:id", (req: Request, res: Response) => {
  return createDate(req, res);
});

export default coursesRouter;
