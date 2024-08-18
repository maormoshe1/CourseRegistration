import { useState, ChangeEvent, useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import Course from "../../Types/Course";
import { Dayjs } from "dayjs";
import "dayjs/locale/he";
import {
  TextField,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Tooltip,
  Box,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import CourseDate from "../../Types/CourseDate";

type RegistrationProps = {
  courseName: string;
  setCourseName: (courseName: string) => void;
};

const SearchCourse: React.FC<RegistrationProps> = ({
  courseName,
  setCourseName,
}) => {
  const coursesContext = useContext(CoursesContext);
  const [courseDate, setCourseDate] = useState<Dayjs | null>(null);
  const allCourses: Course[] = coursesContext!.allCoursesQuery.data!;

  let explanation: string = "";
  let disableAddButton = true;

  const isDateInArray = (targetDate: Date, courseDates: CourseDate[]) => {
    return courseDates.find(
      (courseDate) =>
        new Date(courseDate.date).toLocaleDateString() ===
        targetDate.toLocaleDateString()
    );
  };

  const findCourseByName = (name: string) => {
    return allCourses.find((course) => course.name === name);
  };

  const handleExplanationAndDisable = () => {
    if (courseName === "") {
      explanation = "מלא את השדות";
    } else if (!courseDate?.isValid()) {
      explanation = "התאריך אינו חוקי";
    } else if (findCourseByName(courseName)) {
      const inputDate: Date = courseDate.toDate();
      const courseDates: CourseDate[] =
        findCourseByName(courseName)!.courseDates;
      if (isDateInArray(inputDate, courseDates)) {
        explanation = "התאריך קיים";
      } else {
        disableAddButton = false;
      }
    } else {
      disableAddButton = false;
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    let name: string = event.target.value;
    setCourseName(name);
  };

  const handleDateChange = (date: Dayjs | null) => {
    setCourseDate(date);
  };

  const addCourseToList = (courseName: string, courseDate: Date) => {
    disableAddButton = true;
    const course: Course | undefined = findCourseByName(courseName);
    if (course) {
      const newDate: CourseDate = {
        id: course.id,
        date: courseDate,
      };
      coursesContext?.addNewDateMutation.mutateAsync(newDate);
    } else {
      const newCourse: Course = {
        id: 0,
        name: courseName,
        courseDates: [{ id: 0, date: courseDate }],
        info: "אין מידע",
      };
      coursesContext?.addNewCourseMutation.mutateAsync(newCourse);
    }
  };

  handleExplanationAndDisable();

  return (
    <Card>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "2em" }} color="text.secondary">
          רישום לקורסים
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "1em",
        }}
      >
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: "1em", width: "10em" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="שם קורס"
            variant="outlined"
            onChange={handleNameChange}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="he">
          <DatePicker
            value={courseDate}
            format="DD/MM/YYYY"
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Tooltip title={explanation}>
          <span>
            <Button
              variant="contained"
              onClick={() => addCourseToList(courseName, courseDate!.toDate())}
              disabled={disableAddButton}
            >
              הוסף
            </Button>
          </span>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default SearchCourse;
