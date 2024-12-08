import React, { useState } from "react";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import withClass from "../../../hoc/withClass/withClass";
import { useDispatch } from "react-redux";
import { signUp } from "../../../ridux/reducers/authSlice";
import SignUpForm from "./signUpForm/signUpForm";
import classes from "./signUpPage.module.css";
import Modal from "../../../hoc/UI/modal/modal";
import SignUpModal from "./signUpForm/signUpModal/signUpModal";

const SignUpPage = ({ routeToLogin }) => {
  const [error, setError] = useState("");
  const [signUpModalState, setSignUpModalState] = useState(false);
  const dispatch = useDispatch();

  const signUpHandler = async (data) => {
    setError("");
    try {
      const res = await dispatch(signUp(data));
      res !== undefined ? setSignUpModalState(true) : setSignUpModalState(false);
    } catch (err) {
      setError(err.message || "An error occurred during sign-up.");
      if (signUpModalState) {
        setSignUpModalState(false);
      }
    }
  };

  const routeToLogInHandler = () => {
    setSignUpModalState(false);
    routeToLogin();
  };

  const closeModalHandler = () => {
    setSignUpModalState(false);
  };

  return (
    <Aux>
        <div>
          <SignUpForm sendDataFromForm={signUpHandler} />
          {error && <p className={classes.authError}>{error}</p>}
        </div>
      <Modal isOpen={signUpModalState} onClose={closeModalHandler}>
        <SignUpModal routeToLogin={routeToLogInHandler} />
      </Modal>
    </Aux>
  );
};

export default withClass(SignUpPage, classes.SignUpPage);
