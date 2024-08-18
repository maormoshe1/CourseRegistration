import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import PastTakenCourseItem from "./PastTakenCourseItem";
import Course from "../../Types/Course";
import dayjs from "dayjs";
import { List, ListItem, Box, Typography, CircularProgress } from "@mui/material";

const PastTakenCoursesList: React.FC<{}> = () => {
  const takenCoursesQuery = useContext(CoursesContext)!.takenCoursesQuery;
  const pastTakenCourses: Course[] | undefined = takenCoursesQuery.data?.filter(
    (course) => !dayjs(course.courseDates[0].date).isAfter(dayjs())
  );
  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "0.75em",
        overflow: "hidden",
      }}
    >
      <List style={{ maxHeight: "28em", overflow: "auto" }}>
        {takenCoursesQuery.isLoading ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            {pastTakenCourses?.length === 0 ? (
              <Box textAlign="center" py={15}>
                <Typography variant="body2" color="textSecondary">
                  אין קורסים להצגה
                </Typography>
              </Box>
            ) : (
              pastTakenCourses?.map((pastTakenCourse) => (
                <ListItem
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  key={pastTakenCourse.name}
                  disablePadding
                >
                  <PastTakenCourseItem PastTakenCourse={pastTakenCourse} />
                </ListItem>
              ))
            )}
          </>
        )}
      </List>
    </Box>
  );
};

export default PastTakenCoursesList;
