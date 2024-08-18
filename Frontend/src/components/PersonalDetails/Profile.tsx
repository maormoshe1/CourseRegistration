import { useQuery } from "@tanstack/react-query";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import serverAPI from "../../serverAPI";

const Profile: React.FC<{}> = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => serverAPI.getUser(),
  });

  return (
    <List sx={{ maxHeight: "20vh" }}>
      {userLoading ? (
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
          <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ListItemText
              primary="שם פרטי:"
              secondary={
                <Typography variant="h6">{user?.firstName}</Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ListItemText
              primary="שם משפחה:"
              secondary={<Typography variant="h6">{user?.lastName}</Typography>}
            />
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ListItemText
              primary={'דוא"ל:'}
              secondary={<Typography variant="h6">{user?.email}</Typography>}
            />
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ListItemText
              primary={"תאריך לידה:"}
              secondary={
                <Typography variant="h6">
                  {user ? new Date(user.birthday).toLocaleDateString() : ""}
                </Typography>
              }
            />
          </ListItem>
          <ListItem sx={{ borderBottom: 1, borderColor: "divider" }}>
            <ListItemText
              primary={"טלפון נייד:"}
              secondary={
                <Typography variant="h6">{user?.phoneNumber}</Typography>
              }
            />
          </ListItem>
        </>
      )}
    </List>
  );
};

export default Profile;
