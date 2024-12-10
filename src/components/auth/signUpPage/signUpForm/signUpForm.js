import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

const SignUpForm = ({ sendDataFromForm }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    birthDay: "",
    formIsValid: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    birthDay: "",
  });

  const authLoading = useSelector((state) => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
      case "lastName":
      case "userName":
        if (value.trim().length < 2 || value.trim().length > 15) {
          error = `${name} must be between 2-15 characters.`;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "password":
        if (value.length < 6) {
          error = "Password must be at least 6 characters.";
        }
        break;
      case "birthDay":
        if (!isValidBirthdate(value)) {
          error = "You must be at least 8 years old.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const isValidBirthdate = (birthdateStr) => {
    const birthdate = new Date(birthdateStr);
    const today = new Date();

    if (isNaN(birthdate) || birthdate > today) return false;

    const age = today.getFullYear() - birthdate.getFullYear();
    const isBeforeBirthdayThisYear =
      today.getMonth() < birthdate.getMonth() ||
      (today.getMonth() === birthdate.getMonth() &&
        today.getDate() < birthdate.getDate());

    const finalAge = isBeforeBirthdayThisYear ? age - 1 : age;
    return finalAge >= 8;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const error = validateField(name, value);

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };

      const isFormValid =
        Object.values(updatedData).every(
          (field) =>
            typeof field === "string" ? field.trim() !== "" : field !== ""
        ) && Object.values(formErrors).every((err) => err === "");
      return { ...updatedData, formIsValid: isFormValid };
    });

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendDataFromForm(formData);
  };

  return (
    <Box
    component="form"
    onSubmit={handleSubmit}
    sx={{
      maxWidth: 400,
      margin: "auto",
      padding: 3,
      display: "flex",
      flexDirection: "column",
      gap: 2,
      boxShadow: 3,
      borderRadius: 2,
      color: "text.secondary",
      bgcolor: "background.paper"
      }}
    >
      <Typography variant="h4" sx={{color: "text.primary"}} textAlign="center" gutterBottom>
        Sign Up
      </Typography>

      <TextField
        label="First Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={!!formErrors.name}
        helperText={formErrors.name}
        required
      />

      <TextField
        label="Last Name"
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        error={!!formErrors.lastName}
        helperText={formErrors.lastName}
        required
      />

      <TextField
        label="User Name"
        type="text"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        error={!!formErrors.userName}
        helperText={formErrors.userName}
        required
      />

      <TextField
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={!!formErrors.email}
        helperText={formErrors.email}
        required
      />

      <TextField
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={!!formErrors.password}
        helperText={formErrors.password}
        required
      />

      <TextField
        label="Birthday"
        type="date"
        name="birthDay"
        value={formData.birthDay}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        error={!!formErrors.birthDay}
        helperText={formErrors.birthDay}
        required
      />

      {authError && (
        <Typography color="error" textAlign="center">
          {authError}
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
          disabled={!formData.formIsValid}
        >
          Sign Up
        </Button>
      )}
    </Box>
  );
};

export default SignUpForm;
