import { useContext, useState, lazy, Suspense } from "react";
import { CoursesContext } from "../../CoursesContext";
import Course from "../../Types/Course";
import { IconButton, Dialog, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
const LazyLoadedCart = lazy(() => import("./Cart"));

export default function CartDialog() {
  const chosenCourses: Course[] = useContext(CoursesContext)!.chosenCourses;
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <>
      <Badge badgeContent={chosenCourses.length} color="primary">
        <IconButton onClick={openModal}>
          <ShoppingCartIcon fontSize="large" />
        </IconButton>
      </Badge>
      <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Suspense>
          <LazyLoadedCart />
        </Suspense>
      </Dialog>
    </>
  );
}
