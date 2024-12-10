import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Link,
} from "@mui/material";
import { useSelector } from "react-redux";
import PopUpLogin from "../popUpLogin/popUpLogin";

const LoginForm = ({ sendFormData, forgetPassword, startForgetPassword }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const authLoading = useSelector((state) => state.auth.loading);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => password.length >= 6;

  const isFormValid = () =>
    isEmailValid(loginForm.email) && isPasswordValid(loginForm.password);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) return;
    sendFormData(loginForm);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "auto",
        bgcolor: "background.paper",
        color: "text.secondary",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" sx={{color: "text.primary"}} textAlign="center" gutterBottom >
        Log In
      </Typography>

      <TextField
        label="Email"
        type="email"
        name="email"
        value={loginForm.email}
        onChange={handleInputChange}
        error={!!loginForm.email && !isEmailValid(loginForm.email)}
        helperText={
          loginForm.email && !isEmailValid(loginForm.email)
            ? "Please enter a valid email address."
            : ""
        }
        required
        fullWidth

      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={loginForm.password}
        onChange={handleInputChange}
        error={!!loginForm.password && !isPasswordValid(loginForm.password)}
        helperText={
          loginForm.password && !isPasswordValid(loginForm.password)
            ? "Password must be at least 6 characters long."
            : ""
        }
        required
        fullWidth
      />

      {forgetPassword && (
        <Link
          component="button"
          variant="body2"
          onClick={startForgetPassword}
          sx={{ textAlign: "center", marginTop: -1 }}
        >
          I forgot my password
        </Link>
      )}

      {authLoading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isFormValid()}
          fullWidth
        >
          Log In
        </Button>
      )}

      <PopUpLogin />
    </Box>
  );
};

export default LoginForm;
