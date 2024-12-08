import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../../../ridux/reducers/authSlice";
import { checkIfEmailExistDB } from "../../../../firebase/firebaseDB";

const ResetPasswordModalForm = ({ modalClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [mailSent, setMailSent] = useState("");
  const dispatch = useDispatch();
  const authLoading = useSelector((state) => state.auth.loading);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  };

  const resetPassHandler = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const checkMailExist = await checkIfEmailExistDB(trimmedEmail);

    if (checkMailExist === false) {
      setError(
        "The email address does not appear in the system. Please ensure the email is correct."
      );
      return;
    }

    if (!isEmailValid(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await dispatch(ResetPassword(trimmedEmail));
      if (response === true) {
        setMailSent("A password reset email has been sent to you.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={resetPassHandler}
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Change your Password
      </Typography>

      {mailSent === "" && (
        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          fullWidth
          error={!isEmailValid(email) && email.length > 2}
          helperText={
            !isEmailValid(email) && email.length > 2
              ? "Please enter a valid email address."
              : ""
          }
        />
      )}

      {error && (
        <Typography color="error" textAlign="center">
          {error}
        </Typography>
      )}

      {mailSent !== "" && (
        <Typography textAlign="center" color="primary">
          {mailSent}
        </Typography>
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
          fullWidth
          disabled={mailSent === "" ? !isEmailValid(email) : false}
          onClick={mailSent !== "" ? modalClose : undefined}
        >
          {mailSent === "" ? "Send me link" : "Close"}
        </Button>
      )}
    </Box>
  );
};

export default ResetPasswordModalForm;
