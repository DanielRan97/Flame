import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "./firebase";

//log in with google
const googleProvider = new GoogleAuthProvider();

const loginWithGoogleFB = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Facebook login
const facebookProvider = new FacebookAuthProvider();

const loginWithFacebookFB = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;
    return user;
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.error("User closed the login popup before completing the sign-in.");
    } else if (error.code === "auth/cancelled-popup-request") {
      console.error("Popup request was cancelled (usually because a popup was already open).");
    } else {
      console.error("An error occurred during login:", error.message);
    }
    throw new Error(error.message);
  };
};

//email verification
const emailVerification = async (user) => {
  try {
    await sendEmailVerification(user);
  } catch (error) {
    throw new Error(error.message);
  }
};


//sign up with email and password
const signUpFB = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await emailVerification(userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error during sign up:", error.message);
    throw new Error(error.message);
  }
};

//log in with email and password
const loginFB = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
};

//reset password for email and password login
const resetPasswordFB = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    throw new Error(error.message);
  }
};


//log out
const logoutFB = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
};

export {
  signUpFB,
  loginFB,
  logoutFB,
  resetPasswordFB,
  emailVerification,
  loginWithGoogleFB,
  loginWithFacebookFB
};
