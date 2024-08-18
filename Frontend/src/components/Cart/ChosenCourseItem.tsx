import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import Course from "../../Types/Course";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

type ChosenCourseItemProps = {
  chosenCourse: Course;
};

const ChosenCourseItem: React.FC<ChosenCourseItemProps> = ({
  chosenCourse,
}) => {
  const coursesContext = useContext(CoursesContext);
  const date: string = new Date(
    chosenCourse.courseDates[0].date
  ).toLocaleDateString();

  const deleteCourse = (courseId: number) => {
    coursesContext?.deleteChosenCourse(courseId);
  };

  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "10em",
      }}
    >
      <ListItem disablePadding>
        <Button
          onClick={() => deleteCourse(chosenCourse.id)}
          sx={{ color: "black" }}
        >
          <DeleteIcon />
        </Button>
        <ListItemText primary={chosenCourse.name} />
      </ListItem>
      <ListItem sx={{ paddingLeft: "4em" }}>
        <Typography sx={{ fontSize: "1em" }} color="text.secondary">
          {date}
        </Typography>
        <Tooltip title={chosenCourse.info} placement="top">
          <InfoIcon sx={{ marginLeft: "auto", marginTop: "auto" }} />
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default ChosenCourseItem;
