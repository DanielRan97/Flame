import React from "react";
import { Box, Typography, Button } from "@mui/material";

const SignUpModal = ({ routeToLogin }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
        gap: 2,
        textAlign: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        You Signed Up Successfully
      </Typography>
      <Typography>
        An email to verify your account will be sent to your email.
      </Typography>
      <Typography>
        Click the button below to log in.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={routeToLogin}
      >
        Log In
      </Button>
    </Box>
  );
};

export default SignUpModal;
