import { Router, Request, Response } from "express";
import {
  createTakenCourses,
  deleteTakenCourse,
  getTakenCourses,
} from "../modules/TakenCourses/handler";

const takenCoursesRouter = Router();

//get taken courses
takenCoursesRouter.get("/", (req: Request, res: Response) => {
  return getTakenCourses(req, res);
});

//add taken course
takenCoursesRouter.post("/", (req: Request, res: Response) => {
  return createTakenCourses(req, res);
});

//delete taken course
takenCoursesRouter.delete("/:id", (req: Request, res: Response) => {
  return deleteTakenCourse(req, res);
});

export default takenCoursesRouter;
