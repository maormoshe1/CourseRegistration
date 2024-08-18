import { Router, Request, Response } from "express";

const loginRouter = Router();
let login = false;

loginRouter.get("/", (req: Request, res: Response) => {
  res.json(login);
});

loginRouter.post("/", (req: Request, res: Response) => {
  login = req.body.login;
});

export default loginRouter;
