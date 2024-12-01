import Aux from "../../../../hoc/Auxiliary/Auxiliary";
import withClass from "../../../../hoc/withClass/withClass";
import classes from "./popUpLogin.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { useDispatch } from "react-redux";
import {
  loginWithGoogle,
  loginWithFacebook,
} from "../../../../ridux/reducers/authSlice";
import { useNavigate } from "react-router-dom";

const PopUpLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleLogInHandler = async () => {
    const res = await dispatch(loginWithGoogle());
    if (res.uid) {
      navigate("/");
    }
  };

  const facebookLogInHandler = async () => {
    const res = await dispatch(loginWithFacebook());
    if (res.uid) {
      navigate("/");
    }
  };

  return (
    <Aux>
      <div className={classes.iconContainer}>
        <FontAwesomeIcon
          icon={faGoogle}
          className={classes.popUpIcon}
          onClick={googleLogInHandler}
        />
        <FontAwesomeIcon
          icon={faFacebook}
          className={classes.popUpIcon}
          onClick={facebookLogInHandler}
        />
      </div>
    </Aux>
  );
};

export default withClass(PopUpLogin, classes.PopUpLogin);
