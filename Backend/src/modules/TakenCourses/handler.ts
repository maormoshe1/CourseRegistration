import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Service from "./service";

//system support only 1 use
const userId = 1;

export const getTakenCourses = async (req: Request, res: Response) => {
  try {
    const takenCourses = await Service.getTakenCourses(userId);
    const status = takenCourses ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    return res.status(status).send(takenCourses);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const createTakenCourses = async (req: Request, res: Response) => {
  try {
    const takenCourseIds = await Service.createTakenCourses(
      req.body.ids,
      userId
    );
    const status = takenCourseIds ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    return res.status(status).send(takenCourseIds);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const deleteTakenCourse = async (req: Request, res: Response) => {
  try {
    const courseDateId = Number(req.params.id);
    const deletedcourse = await Service.deleteTakenCourse(userId, courseDateId);
    const status = deletedcourse ? StatusCodes.OK : StatusCodes.NOT_FOUND;
    return res.status(status).send(deletedcourse);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err);
  }
};
