import { createContext, useState, useEffect } from "react";
import Course from "./Types/Course";
import serverAPI from "./serverAPI";
import CourseDate from "./Types/CourseDate";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

export const CoursesContext = createContext<CoursesContextType | null>(null);

type CoursesContextType = {
  allCoursesQuery: UseQueryResult<Course[] | undefined, Error>;
  chosenCourses: Course[];
  takenCoursesQuery: UseQueryResult<Course[] | undefined, Error>;
  addNewCourseMutation: UseMutationResult<void, Error, Course, unknown>;
  addNewDateMutation: UseMutationResult<void, Error, CourseDate, unknown>;
  addChosenCourse: (chosenCourse: Course) => void;
  deleteChosenCourse: (id: number) => void;
  clearChosenCourses: () => void;
  addTakenCoursesMutation: UseMutationResult<void, Error, number[], unknown>;
  deleteTakenCourseMutation: UseMutationResult<void, Error, Course, unknown>;
};

type CoursesContextProviderProps = {
  children: React.ReactNode;
};

const CoursesProvider: React.FC<CoursesContextProviderProps> = ({
  children,
}) => {
  const [chosenCourses, setChosenCourses] = useState<Course[]>([]);
  const queryClient = useQueryClient();

  const allCoursesQuery = useQuery({
    queryKey: ["allCourses"],
    queryFn: () => serverAPI.getAllCourses(),
  });

  const takenCoursesQuery = useQuery({
    queryKey: ["takenCourses"],
    queryFn: () => serverAPI.getTakenCourses(),
  });

  const addNewCourseMutation = useMutation({
    mutationFn: (course: Course) => serverAPI.postNewCourse(course),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCourses"] });
    },
    onError: () => {
      toast.error("יש בעיה בחיבור לשרת...");
    },
  });

  const addNewDateMutation = useMutation({
    mutationFn: (courseDate: CourseDate) => serverAPI.postNewDate(courseDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCourses"] });
    },
    onError: () => {
      toast.error("יש בעיה בחיבור לשרת...");
    },
  });

  const addTakenCoursesMutation = useMutation({
    mutationFn: (takenCourseIds: number[]) =>
      serverAPI.postTakenCourses(takenCourseIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["takenCourses"] });
      toast.success("נרשמת בהצלחה");
      clearChosenCourses();
    },
    onError: () => {
      toast.error("יש בעיה בחיבור לשרת...");
    },
  });

  const deleteTakenCourseMutation = useMutation({
    mutationFn: (takenCourse: Course) =>
      serverAPI.deleteTakenCourse(takenCourse),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["takenCourses"] });
      toast.success("הקורס נמחק בהצלחה");
    },
    onError: () => {
      toast.error("יש בעיה בחיבור לשרת...");
    },
  });

  const addChosenCourse = (chosenCourse: Course) => {
    setChosenCourses((prevChosenCourses) => {
      return [...prevChosenCourses, chosenCourse];
    });
  };

  const deleteChosenCourse = (id: number) => {
    setChosenCourses((prevChosenCourses) =>
      prevChosenCourses.filter((chosenCourse) => chosenCourse.id !== id)
    );
  };

  const clearChosenCourses = () => {
    setChosenCourses([]);
  };

  return (
    <CoursesContext.Provider
      value={{
        allCoursesQuery,
        chosenCourses,
        takenCoursesQuery,
        addNewCourseMutation,
        addNewDateMutation,
        addChosenCourse,
        deleteChosenCourse,
        clearChosenCourses,
        addTakenCoursesMutation,
        deleteTakenCourseMutation,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export default CoursesProvider;
