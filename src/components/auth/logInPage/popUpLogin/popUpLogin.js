import React from "react";
import { Box, IconButton } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { loginWithGoogle, loginWithFacebook, authFailure } from "../../../../ridux/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const PopUpLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogInHandler = async () => {
    try {
      const res = await dispatch(loginWithGoogle());
      if (res.uid) {
        navigate("/myFlame");
      }
    } catch (error) {
      dispatch(authFailure("Failed to log in with Google"));
    }
  };

  const facebookLogInHandler = async () => {
    try {
      const res = await dispatch(loginWithFacebook());
      if (res) {
        navigate("/myFlame");
      }
    } catch (error) {
      dispatch(authFailure("Failed to log in with Facebook"));
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 2,
      }}
    >
      <IconButton
        onClick={googleLogInHandler}
        sx={{ color: "#DB4437" }} // Google red color
        aria-label="Login with Google"
      >
        <Google fontSize="large" />
      </IconButton>
      <IconButton
        onClick={facebookLogInHandler}
        sx={{ color: "#4267B2" }} // Facebook blue color
        aria-label="Login with Facebook"
      >
        <Facebook fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default PopUpLogin;
