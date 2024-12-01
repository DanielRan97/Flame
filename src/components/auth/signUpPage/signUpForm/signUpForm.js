import React, { useState } from "react";
import classes from "./signUpForm.module.css";
import { useSelector } from "react-redux";
import Loading from "../../../../utilities/loading/loading";

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
        if (value.trim().length < 2) {
          error = "First name must be 2-15 characters long.";
        }
        break;
      case "lastName":
        if (value.trim().length < 2) {
          error = "Last name must be 2-15 characters long.";
        }
        break;
      case "userName":
        if (value.trim().length < 2) {
          error = "userName must be 2-15 characters long.";
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Password must be 8-15 characters long.";
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
    <form onSubmit={handleSubmit} className={classes.SignUpForm}>
      <h1>Sign Up</h1>
      <div>
        <label>
          <p>First Name:</p>
          <input
            minLength={2}
            maxLength={15}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {formErrors.name && (
            <p className={classes.inputError}>{formErrors.name}</p>
          )}
        </label>
      </div>
      <div>
        <label>
          <p>Last Name:</p>
          <input
            minLength={2}
            maxLength={15}
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {formErrors.lastName && (
            <p className={classes.inputError}>{formErrors.lastName}</p>
          )}
        </label>
      </div>
      <div>
        <label>
          <p>User Name:</p>
          <input
            minLength={2}
            maxLength={15}
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          {formErrors.userName && (
            <p className={classes.inputError}>{formErrors.userName}</p>
          )}
        </label>
      </div>
      <div>
        <label>
          <p>Email:</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {formErrors.email && (
            <p className={classes.inputError}>{formErrors.email}</p>
          )}
        </label>
      </div>
      <div>
        <label>
          <p>Password:</p>
          <input
            minLength={2}
            maxLength={15}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {formErrors.password && (
            <p className={classes.inputError}>{formErrors.password}</p>
          )}
        </label>
      </div>
      <div>
        <label>
          <p>Birthday:</p>
          <input
            type="date"
            name="birthDay"
            value={formData.birthDay}
            onChange={handleChange}
            required
          />
          {formErrors.birthDay && (
            <p className={classes.inputError}>{formErrors.birthDay}</p>
          )}
        </label>
      </div>
      {authError !== "" && <p className={classes.inputError}>{authError}</p>}
      {authLoading ? (
        <Loading />
      ) : (
        <button
          disabled={!formData.formIsValid}
          type="submit"
          className={classes.signUpFormButton}
        >
          Sign Up
        </button>
      )}
    </form>
  );
};

export default SignUpForm;
