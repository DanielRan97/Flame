import { useDispatch, useSelector } from "react-redux";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import withClass from "../../../hoc/withClass/withClass";
import { logIn } from "../../../ridux/reducers/authSlice";
import LoginForm from "./logInForm/loginForm";
import { useNavigate } from "react-router-dom";
import classes from "./loginPage.module.css";
import { useState } from "react";
import Modal from "../../../hoc/UI/modal/modal";
import ResetPasswordModalForm from "./resetPasswordModalForm/resetPasswordModalForm";

const LoginPage = () => {
  const [forgetPasswordState, setForgetPasswordState] = useState(false);
  const [resetPasswordModalState, setResetPasswordModalState] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  const loginHandler = async (userData) => {
    setForgetPasswordState(false);
    try {
      const res = await dispatch(logIn(userData));
      if (res.uid) {
        navigate(`/`);
      }
    } catch (err) {
      setForgetPasswordState(true);
    }
  };

  const closeResetPasswordModal = () => {
    setResetPasswordModalState(false);
  };

  return (
    <Aux>
        <LoginForm
          sendFormData={loginHandler}
          forgetPassword={forgetPasswordState}
          startForgetPassword = {() => setResetPasswordModalState(true)}
        />
      {authError !== "" && (
        <p
          className={classes.inputError}
        >
          {authError}
        </p>
      )}
      {resetPasswordModalState && (
        <Modal isOpen={resetPasswordModalState} onClose={closeResetPasswordModal}>
          <ResetPasswordModalForm modalClose={() => setResetPasswordModalState(false)}/>
        </Modal>
      )}
    </Aux>
  );
};

export default withClass(LoginPage, classes.LoginPage);
