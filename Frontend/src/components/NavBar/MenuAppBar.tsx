import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  Box,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import serverAPI from "../../serverAPI";
import { useQueryClient } from "@tanstack/react-query";

type MenuAppBarProps = {
  isLogin: boolean;
};

const MenuAppBar: React.FC<MenuAppBarProps> = ({ isLogin }) => {
  let navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let login: boolean = event.target.checked;
    serverAPI.postLogin(login);
    queryClient.setQueryData<boolean>(["login"], () => {
      return login;
    });
    if (login) {
      navigate("/Registration");
    } else {
      navigate("/");
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "primary.light" }}>
        <Toolbar>
          {isLogin && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate("/Profile")}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          )}
          <Typography
            variant="h5"
            component="div"
            sx={{ paddingRight: "1em", paddingLeft: "1em" }}
          >
            {isLogin ? "הרשמה לקורסים" : ""}
          </Typography>
          <FormGroup sx={{ marginLeft: "auto" }}>
            <FormControlLabel
              control={
                <Switch
                  checked={isLogin}
                  onChange={handleChange}
                  aria-label="login switch"
                />
              }
              label={isLogin ? "Logout" : "Login"}
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MenuAppBar;
