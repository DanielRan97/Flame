import React, { useState } from "react";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import withClass from "../../../../hoc/withClass/withClass";
import classes from "./resetPasswordModalForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "../../../../ridux/reducers/authSlice";
import Loading from "../../../../hoc/UI/loading/loading";
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
      setError("The email address does not appear in the system, please note that you entered the email address correctly.");
      return;
    }

    if (!isEmailValid(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await dispatch(ResetPassword(trimmedEmail));
      if (response === true) {
        setMailSent("A password change email has been sent to you.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const buttonForm =
    mailSent === "" ? (
      <button
        className={classes.changePassButton}
        disabled={!isEmailValid(email)}
        type="submit"
      >
        Send me link
      </button>
    ) : (
      <button className={classes.changePassButton} onClick={modalClose}>
        Close
      </button>
    );

  return (
    <Aux>
      <form onSubmit={resetPassHandler}>
        <h3>Change your Password</h3>
        {mailSent === "" && <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your Email address"
        />}
        {!isEmailValid(email) && email.length > 2 && (
          <p className={classes.errorMessage}>
            Please enter a valid email address.
          </p>
        )}
        {error && <p className={classes.errorMessage}>{error}</p>}
        {mailSent !== "" && <p>{mailSent}</p>}
        {authLoading ? <Loading /> : buttonForm}
      </form>
    </Aux>
  );
};

export default withClass(
  ResetPasswordModalForm,
  classes.ResetPasswordModalForm
);
