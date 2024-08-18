import { useContext, useState } from "react";
import { CoursesContext } from "../../CoursesContext";
import Course from "../../Types/Course";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";

type FutureTakenCourseItemProps = {
  furureTakenCourse: Course;
};

const FutureTakenCourseItem: React.FC<FutureTakenCourseItemProps> = ({
  furureTakenCourse,
}) => {
  const date: string = new Date(
    furureTakenCourse.courseDates[0].date
  ).toLocaleDateString();
  const deleteTakenCourse = useContext(CoursesContext)!.deleteTakenCourseMutation.mutateAsync;
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const deleteCourse = (takenCourse: Course) => {
    deleteTakenCourse(takenCourse);
    closeModal();
  };

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxHeight: "10em",
        }}
      >
        <ListItem disablePadding>
          <Button onClick={openModal} sx={{ color: "black" }}>
            <DeleteIcon />
          </Button>
          <ListItemText primary={furureTakenCourse.name} />
        </ListItem>
        <ListItem sx={{ paddingLeft: "4em" }}>
          <Typography sx={{ fontSize: "1em" }} color="text.secondary">
            {date}
          </Typography>
          <Tooltip title={furureTakenCourse.info} placement="top">
            <InfoIcon sx={{ marginLeft: "auto", marginTop: "auto" }} />
          </Tooltip>
        </ListItem>
      </List>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          האם אתה בטוח שאתה רוצה למחוק את הקורס?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            לאחר המחיקה תוכל להרשם אליו מחדש דרך רשימת הקורסים במידה ויישאר מקום
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteCourse(furureTakenCourse)}>מחק</Button>
          <Button onClick={closeModal} autoFocus>
            בטל
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FutureTakenCourseItem;
