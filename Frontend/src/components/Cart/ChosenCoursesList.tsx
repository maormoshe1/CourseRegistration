import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import ChosenCourseItem from "./ChosenCourseItem";
import Course from "../../Types/Course";
import { List, ListItem, Box, Typography } from "@mui/material";

const ChosenCoursesList: React.FC<{}> = ({}) => {
  const chosenCourses: Course[] = useContext(CoursesContext)!.chosenCourses;
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
      }}
    >
      <List style={{ minHeight: "20em", maxHeight: "20em", overflow: "auto" }}>
        {chosenCourses?.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Typography variant="body2" color="textSecondary">
              בחר קורסים מהרשימה
            </Typography>
          </Box>
        ) : (
          chosenCourses.map((chosenCourse) => (
            <ListItem
              sx={{ borderBottom: 1, borderColor: "divider" }}
              key={chosenCourse.name}
              disablePadding
            >
              <ChosenCourseItem chosenCourse={chosenCourse} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default ChosenCoursesList;
