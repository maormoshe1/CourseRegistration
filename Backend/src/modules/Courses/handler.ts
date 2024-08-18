import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
import Service from "./service";
import CourseInput from "../../Types/CourseInput";

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Service.getAllCourses();
    const status = courses ? StatusCodes.OK : StatusCodes.NOT_FOUND
    return res.status(status).send(courses);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const courseInput: CourseInput = {
      name: req.body.courseName,
      date: req.body.courseDate,
      info: req.body.info,
    };
    const course = await Service.createCourse(courseInput);
    const status = course ? StatusCodes.OK : StatusCodes.NOT_FOUND
    return res.status(status).send(course);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
  }
};

export const createDate = async (req: Request, res: Response) => {
  try {
    const courseId: number = Number(req.params.id);
    const date: Date = new Date(req.body.date);
    const courseDate = await Service.createDate(date, courseId);
    const status = courseDate ? StatusCodes.OK : StatusCodes.NOT_FOUND
    return res.status(status).send(courseDate);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
  }
};
