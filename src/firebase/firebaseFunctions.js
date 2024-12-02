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
    throw error;
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
    throw error;
  }
};

//email verification
const emailVerification = async (user) => {
  try {
    await sendEmailVerification(user);
  } catch (error) {
    throw error;
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
    throw error;
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
    throw error;
  }
};

//reset password for email and password login
const resetPasswordFB = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error("Error sending password reset email:", error.message);
    throw error;
  }
};

//log out
const logoutFB = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export {
  signUpFB,
  loginFB,
  logoutFB,
  resetPasswordFB,
  emailVerification,
  loginWithGoogleFB,
  loginWithFacebookFB,
};
