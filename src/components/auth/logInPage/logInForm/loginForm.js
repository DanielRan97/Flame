import React, { useState } from "react";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import classes from "./loginForm.module.css";
import { useSelector } from "react-redux";
import Loading from "../../../../utilities/loading/loading";
import PopUpLogin from "../popUpLogin/popUpLogin";

const LoginForm = ({ sendFormData, forgetPassword, startForgetPassword }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const authLoading = useSelector((state) => state.auth.loading);
  const loading = <Loading />

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => password.length >= 8;

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
    <Aux>
      <form className={classes.LogInForm} onSubmit={handleSubmit}>
        <h1 className={classes.LoginFormHeader}>Log In</h1>

        <div>
          <label>
            <p>Email:</p>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleInputChange}
              required
            />
          </label>
          {!isEmailValid(loginForm.email) && loginForm.email && (
            <p className={classes.inputError}>
              Please enter a valid email address.
            </p>
          )}
        </div>
        <div className={classes.PasswordInputDiv}>
          <label>
            <p>Password:</p>
            <input
              value={loginForm.password}
              minLength={2}
              maxLength={15}
              type="password"
              name="password"
              onChange={handleInputChange}
              required
            />
            {loginForm.password && !isPasswordValid(loginForm.password) && (
              <p className={classes.inputError}>
                Password must be at least 8 characters long.
              </p>
            )}
            {forgetPassword === true && (
              <p
                className={classes.forgotPasswordLink}
                onClick={() => {
                  startForgetPassword();
                }}
              >
                I forgot my password
              </p>
            )}
          </label>
        </div>
        {authLoading ? loading :<button
          type="submit"
          disabled={!isFormValid()}
          className={classes.LogInFormButton}
        >Log In</button>}
        <PopUpLogin />
      </form>
    </Aux>
  );
};

export default LoginForm;
