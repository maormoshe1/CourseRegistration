import cors from "cors";
import express from "express";
import coursesRouter from "./Routes/Courses";
import takenCoursesRouter from "./Routes/TakenCourses";
import userRouter from "./Routes/User";
import { connectDB } from "./config/DBconfig";
import loginRouter from "./Routes/Login";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/login", loginRouter);

app.use("/api/user", userRouter);

app.use("/api/courses", coursesRouter);

app.use("/api/takenCourses", takenCoursesRouter);

connectDB
  .initialize()
  .then(() => {
    console.log("workkk");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(5000, () => {
  console.log("server is listening..");
});
