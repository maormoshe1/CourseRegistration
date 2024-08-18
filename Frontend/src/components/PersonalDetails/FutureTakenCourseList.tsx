import { useContext } from "react";
import { CoursesContext } from "../../CoursesContext";
import FutureTakenCourseItem from "./FutureTakenCourseItem";
import Course from "../../Types/Course";
import dayjs from "dayjs";
import { List, ListItem, Box, Typography, CircularProgress } from "@mui/material";
import WaitingPage from "../../Pages/WaitingPage";

const FutureTakenCoursesList: React.FC<{}> = () => {
  const takenCoursesQuery = useContext(CoursesContext)!.takenCoursesQuery;
  const futureTakenCourses: Course[] | undefined =
    takenCoursesQuery.data?.filter((course) =>
      dayjs(course.courseDates[0].date).isAfter(dayjs())
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
            {futureTakenCourses?.length === 0 ? (
              <Box textAlign="center" py={15}>
                <Typography variant="body2" color="textSecondary">
                  אין קורסים להצגה
                </Typography>
              </Box>
            ) : (
              futureTakenCourses?.map((futureTakenCourse) => (
                <ListItem
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  key={futureTakenCourse.name}
                  disablePadding
                >
                  <FutureTakenCourseItem
                    furureTakenCourse={futureTakenCourse}
                  />
                </ListItem>
              ))
            )}
          </>
        )}
      </List>
    </Box>
  );
};

export default FutureTakenCoursesList;
