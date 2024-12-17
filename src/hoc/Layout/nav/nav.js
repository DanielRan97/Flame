import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { authFailure, signOut } from "../../../ridux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import profilePhoto from "../../../assets/photos/profilePhotos/ph1.png";
import Aux from "../../Auxiliary/Auxiliary";

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.user?.uid);
  const navigate = useNavigate();

  const settings = isAuth ? ["Profile", "Account", "Dashboard", "Logout"] : ["Profile", "Account", "Dashboard"];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (key) => {
    userMenuHandler(key);
    setAnchorElUser(null);
  };

  const logoutHandler = () => {
    try {
      const res = dispatch(signOut());
      if (res) {
        navigate(`/auth`);
      }
    } catch (error) {
       dispatch(authFailure(error));
    }
  };

  const userMenuHandler = (key) => {
    if (key === "Logout") {
      logoutHandler();
    }
  };

  return (
    <Aux>
    <AppBar position="static" >
      <Container maxWidth="xl" sx={{bgcolor: "primary.main"}}>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "text.primary",
              textDecoration: "none",
            }}
          >
            Flame
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 3,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "text.primary",
              textDecoration: "none",
            }}
          >
            Flame
          </Typography>

          {/* Align this box to the right */}
          <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
            {!isAuth ? <Button variant="outlined" color="secondary" onClick={() => navigate('/auth')}>Log In/Sign Up</Button> :
             <Tooltip title="Open settings">
             <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
               <Avatar src={profilePhoto} />
             </IconButton>
           </Tooltip>
            }
            <Menu
              disableScrollLock={true}
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </Aux>
  );
}

export default ResponsiveAppBar;
