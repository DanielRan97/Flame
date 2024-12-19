import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import withClass from "../../../hoc/withClass/withClass";
import Modal from "../../../hoc/UI/modal/modal";
import LoginForm from "./logInForm/loginForm";
import ResetPasswordModalForm from "./resetPasswordModalForm/resetPasswordModalForm";
import classes from "./loginPage.module.css";
import { logIn, signUp } from "../../../ridux/reducers/authSlice";
import Aux from "../../../hoc/Auxiliary/Auxiliary";

const LoginPage = () => {
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [showForgetPasswordMessage, setShowForgetPasswordMessage] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [userDataState, setUserDataState] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);

  useEffect(() => {
    let timerId;

    if (isCountdownActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCountdownActive(false);
    }

    return () => clearInterval(timerId);
  }, [isCountdownActive, timeLeft]);

  const loginHandler = async (userData) => {
    setShowForgetPasswordMessage(false);
    setUserDataState(userData);
    try {
      const res = await dispatch(logIn(userData));
      if (res && res.uid) {
        navigate(`/myFlame`);
      }
    } catch (err) {
      setShowForgetPasswordMessage(true);
    }
  };

  const closeResetPasswordModal = () => {
    setIsResetPasswordModalOpen(false);
  };

  const sendMailAgain = () => {
    if (!isCountdownActive) {
      setTimeLeft(60);
      setIsCountdownActive(true);
    }
    dispatch(signUp(userDataState, true));
  };

  return (
    <Aux>
      <LoginForm
        sendFormData={loginHandler}
        forgetPassword={showForgetPasswordMessage}
        startForgetPassword={() => setIsResetPasswordModalOpen(true)}
      />
      {authError && (
        <p className={classes.inputError}>
          {authError === "Please check that you have verified your account by email." || authError === "Too many requests. Please try again later." ? (
            <>
              {authError} <br />
              <span
                className={classes.SendMailAgainLink}
                onClick={() => sendMailAgain()}
                style={{ pointerEvents: isCountdownActive ? "none" : "auto", opacity: isCountdownActive ? 0.6 : 1 }}
              >
                {isCountdownActive ? `${timeLeft}s` : "Send me again"}
              </span>
            </>
          ) : (
            authError
          )}
        </p>
      )}
      {isResetPasswordModalOpen && (
        <Modal isOpen={isResetPasswordModalOpen} onClose={closeResetPasswordModal}>
          <ResetPasswordModalForm modalClose={closeResetPasswordModal} />
        </Modal>
      )}
    </Aux>
  );
};

export default withClass(LoginPage, classes.LoginPage);
