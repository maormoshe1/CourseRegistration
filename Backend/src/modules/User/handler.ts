import { Request, Response } from "express";
import {StatusCodes} from "http-status-codes"
import Service from "./service";

//system support only 1 user
const userId = 1;

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await Service.getOneById(userId);
    const status = user ? StatusCodes.OK : StatusCodes.NOT_FOUND
    return res.status(status).send(user);
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(err)
  }
};

export const createUser = async () => {
  Service.createUser();
};
