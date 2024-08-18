import { useState } from "react";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import CourseDate from "../../Types/CourseDate";

type SelectCourseDateProps = {
  courseDates: CourseDate[];
  setPickedCourseDate: (pickedCourseDate: CourseDate | null) => void;
};

const SelectCourseDate: React.FC<SelectCourseDateProps> = ({
  courseDates,
  setPickedCourseDate,
}) => {
  const [date, setDate] = useState("");

  const selectCourseDate = (event: SelectChangeEvent) => {
    let date: string = event.target.value;
    setDate(date);
    if (date === "") {
      setPickedCourseDate(null);
    } else {
      const [day, month, year] = date.split(".");
      const dateObject: Date = new Date(`${year}-${month}-${day}`);
      const pickedCourseDate: CourseDate = courseDates.find(
        (courseDate) =>
          new Date(courseDate.date).toLocaleDateString() ===
          dateObject.toLocaleDateString()
      )!;
      setPickedCourseDate(pickedCourseDate);
    }
  };
  return (
    <div>
      <FormControl variant="standard" sx={{ m: "0.25em", minWidth: "7em" }}>
        <InputLabel id="demo-simple-select-standard-label">תאריך</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={date}
          onChange={selectCourseDate}
          label="Date"
        >
          <MenuItem value="">
            <em>---</em>
          </MenuItem>
          {courseDates.map((courseDate, key) => {
            let dateString = new Date(courseDate.date).toLocaleDateString();
            return (
              <MenuItem key={key} value={dateString}>
                {dateString}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCourseDate;
