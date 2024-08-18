import { useState, useContext, useEffect } from "react";
import { CoursesContext } from "../../CoursesContext";
import SelectCourseDate from "./SelectCourseDate";
import Course from "../../Types/Course";
import { IconButton, List, ListItem, Tooltip, Typography } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CourseDate from "../../Types/CourseDate";

type CourseItemProps = {
  course: Course;
};

const CourseItem: React.FC<CourseItemProps> = ({ course }) => {
  const coursesContext = useContext(CoursesContext);
  const [pickedCourseDate, setPickedCourseDate] = useState<CourseDate | null>(
    null
  );
console.log("enter course item");

  let explanation: string = "";
  let disableAddButton = true;

  const addToCartBtnFeatures = () => {
    const isChosen = coursesContext!.chosenCourses.some(
      (chosenCourse) => chosenCourse.id === course.id
    );

    const isTaken = coursesContext!.takenCoursesQuery.data?.some(
      (takenCourse) => takenCourse.id === course.id
    );
    if (pickedCourseDate === null) {
      if (!isChosen && !isTaken) {
        explanation = "בחר תאריך";
      } else {
        explanation = "הקורס נבחר";
      }
    } else if (!isChosen && !isTaken) {
      disableAddButton = false;
    } else {
      explanation = "הקורס נבחר";
    }
  };

  addToCartBtnFeatures();

  const addCourseToCart = (course: Course, courseDate: CourseDate) => {
    let chosenCourse: Course = { ...course };
    chosenCourse.courseDates = [courseDate];
    coursesContext?.addChosenCourse(chosenCourse);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "10em",
      }}
    >
      <ListItem>
        <Tooltip title={explanation} placement="top">
          <span>
            <IconButton
              onClick={() => addCourseToCart(course, pickedCourseDate!)}
              disabled={disableAddButton}
              color="primary"
              sx={{ marginRight: "0.5em" }}
            >
              {explanation === "הקורס נבחר" ? (
                <ShoppingCartIcon />
              ) : (
                <AddShoppingCartIcon />
              )}
            </IconButton>
          </span>
        </Tooltip>
        <Typography sx={{ fontSize: "1.1em" }} color="text.secondary">
          {course.name}
        </Typography>
      </ListItem>
      <ListItem sx={{ marginTop: "-2em", paddingLeft: "4em" }}>
        <SelectCourseDate
          courseDates={course.courseDates}
          setPickedCourseDate={setPickedCourseDate}
        />
        <Tooltip title={course.info} placement="top">
          <InfoIcon sx={{ marginLeft: "auto", marginTop: "auto" }} />
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default CourseItem;
