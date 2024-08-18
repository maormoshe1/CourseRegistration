import { Router, Request, Response } from "express";
import { createUser, getUser } from "../modules/User/handler";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
  return getUser(req, res);
  //return createUser()
});

export default userRouter;
