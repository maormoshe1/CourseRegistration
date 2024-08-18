import { useState } from "react";
import AllCoursesList from "../components/ChooseCourses/AllCoursesList";
import SearchCourse from "../components/SearchAddCourses/SearchCourse";
import CartDialog from "../components/Cart/CartDialog";
import { Box, Grid } from "@mui/material";
import { ToastContainer } from "react-toastify";

const CourseRegistrationPage: React.FC<{}> = () => {
  const [courseName, setCourseName] = useState("");

  return (
    <Box sx={{ margin: "1em" }}>
      <CartDialog />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Grid container justifyContent={"center"}>
        <Grid item xs={4} justifyContent="center">
          <Grid item xs={12}>
            <SearchCourse
              courseName={courseName}
              setCourseName={setCourseName}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "1vh" }}>
            <AllCoursesList courseName={courseName} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseRegistrationPage;
