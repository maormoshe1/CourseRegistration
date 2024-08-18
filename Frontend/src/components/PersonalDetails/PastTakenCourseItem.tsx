import Course from "../../Types/Course";
import {
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

type PastTakenCourseItemProps = {
  PastTakenCourse: Course;
};

const PastTakenCourseItem: React.FC<PastTakenCourseItemProps> = ({
  PastTakenCourse,
}) => {
  const date: string = new Date(
    PastTakenCourse.courseDates[0].date
  ).toLocaleDateString();
  return (
    <List
      sx={{
        width: "100%",
        maxHeight: "10em",
      }}
    >
      <ListItem sx={{ paddingLeft: "4em" }} disablePadding>
        <ListItemText primary={PastTakenCourse.name} />
      </ListItem>
      <ListItem sx={{ paddingLeft: "4em" }}>
        <Typography sx={{ fontSize: "1em" }} color="text.secondary">
          {date}
        </Typography>
        <Tooltip title={PastTakenCourse.info} placement="top">
          <InfoIcon sx={{ marginLeft: "auto", marginTop: "auto" }} />
        </Tooltip>
      </ListItem>
    </List>
  );
};

export default PastTakenCourseItem;
