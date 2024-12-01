import classes from "./signUpModal.module.css";

const SignUpModal = ({routeToLogin}) => {


    return(
        <div>
            <h2>You Sign Up successfully</h2>
            <p>An email to verify your account will be sent to your email.</p>
            <p>Click here to Log In</p>
            <button className={classes.signUpModalButton} onClick={() => routeToLogin()}>Log In</button>
        </div>
    )
}

export default SignUpModal;