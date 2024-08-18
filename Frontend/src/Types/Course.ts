import CourseDate from "./CourseDate";

type Course = {
  id: number;
  name: string;
  courseDates: CourseDate[];
  info: string;
};

export default Course;
