import Course from "./Types/Course";
import CourseDate from "./Types/CourseDate";
import User from "./Types/User";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export default class serverAPI {
  static getLogin = async (): Promise<boolean | undefined> => {
    try {
      const res = await api.get("/login");
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  static postLogin = async (login: boolean) => {
    try {
      await api.post("/login", {
        login: login,
      });
    } catch (err) {
      console.log(err);
    }
  };

  static getUser = async () => {
    try {
      const res = await api.get("/user");
      return res.data as User;
    } catch (err) {
      console.log(err);
    }
  };

  static getAllCourses = async () => {
    try {
      const res = await api.get("/courses");
      return res.data as Course[];
    } catch (err) {
      console.log(err);
    }
  };

  static postNewCourse = async (course: Course) => {
    await api.post("/courses", {
      courseName: course.name,
      courseDate: course.courseDates[0].date,
      info: course.info,
    });
  };

  static postNewDate = async (courseDate: CourseDate) => {
    await api.put(`/courses/${courseDate.id}`, {
      date: courseDate.date,
    });
  };

  static getTakenCourses = async () => {
    try {
      const res = await api.get("/takenCourses");
      return res.data as Course[];
    } catch (err) {
      console.log(err);
    }
  };

  static postTakenCourses = async (takenCoursesIds: number[]) => {
    await api.post("/takenCourses", {
      ids: takenCoursesIds
    });
  };

  static deleteTakenCourse = async (takenCourse: Course) => {
    await api.delete(`/takenCourses/${takenCourse.courseDates[0].id}`);
  };
}
