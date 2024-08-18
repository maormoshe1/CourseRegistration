import { connectDB } from "../../config/DBconfig";
import { Course } from "../../Entities/Course";
import { CourseDate } from "../../Entities/CourseDate";
import CourseInput from "../../Types/CourseInput";

const coursesRepository = connectDB.getRepository(Course);
const courseDateRepository = connectDB.getRepository(CourseDate);

export default class Service {
  static getAllCourses = async () => {
    return await coursesRepository.find({
      relations: ["courseDates"],
    });
  };

  static createDate = async (date: Date, courseId: number) => {
    const newCourseDate = { date: date, course: { id: courseId } };
    return await courseDateRepository.save(newCourseDate);
  };

  static createCourse = async (course: CourseInput) => {
    const newCourse = { name: course.name, info: course.info };
    const result = await coursesRepository.save(newCourse);
    return this.createDate(course.date, result.id);
  };
}
