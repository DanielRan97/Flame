import { useState, useEffect } from "react";
import classes from "./auth.module.css";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import withClass from "../../hoc/withClass/withClass"
import SignUpPage from "../../components/auth/signUpPage/signUpPage";
import LoginPage from "../../components/auth/logInPage/loginPage";
import { useDispatch } from "react-redux";
import { authStop } from "../../ridux/reducers/authSlice";

const Auth = () => {
  const [formState, setFormState] = useState("logIn");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStop());
}, );


const changeForm = () => {
  dispatch(authStop());
  setFormState(formState === "signUp" ? "logIn" : "signUp")
}

  return (
    <Aux>
      {formState === "signUp" ? <SignUpPage routeToLogin={() => setFormState("logIn")}/> : <LoginPage />}
      <p
        className={classes.changeForm}
        onClick={changeForm}
      >
        {formState === "signUp"
          ? `Already have an account? Log In here`
          : `Don't have an account? Sign Up here`}
      </p>
    </Aux>
  );
};

export default withClass(Auth , classes.Auth);

