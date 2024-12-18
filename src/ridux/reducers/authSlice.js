import { createSlice } from "@reduxjs/toolkit";
import {
  signUpFB,
  loginFB,
  logoutFB,
  resetPasswordFB,
  loginWithGoogleFB,
  loginWithFacebookFB,
} from "../../firebase/firebaseFunctions";
import {
  setUserToDB,
  getOneUserFromDB,
  checkIfUserNameExistDB,
  checkIfEmailExistDB,
} from "../../firebase/firebaseDB";
import getFirebaseAuthErrorMessage from "../../utilities/fireBaseError/fireBaseError";
import createUniqUserName from "../../utilities/auth/createUserName/createUserName";
import createUniqFid from "../../utilities/auth/createUniqFid/createUniqFid";
import createProfilePicture from "../../utilities/auth/createProfilePicture/createProfilePicture";

//sign up
export const signUp = (userData, sendEmailVerification) => async (dispatch) => {
  try {
    dispatch(authStart());
    if (sendEmailVerification === true) {
      await signUpFB(userData.email, userData.password, true);
      await dispatch(authStop());
      return;
    }
    const emailExist = await checkIfEmailExistDB(userData.email);
    if (emailExist === true) {
      throw new Error(`${userData.email} already exists, try to log in`);
    }

    const userNameExist = await checkIfUserNameExistDB(userData.userName);
    if (userNameExist === true) {
      throw new Error(
        `${userData.userName} already exists, choose another user name`
      );
    }

    const res = await signUpFB(userData.email, userData.password, false);

    if (!res || !res.uid) {
      throw new Error(
        "The connection with the server failed, please check your internet connection"
      );
    }

    const user = {
      uid: res.uid,
      displayName:
        userData.name?.trim() + " " + userData.lastName?.trim() || "",
      userName: userData.userName?.trim() || "",
      email: userData.email?.trim() || "",
      birthDay: userData.birthDay?.trim() || "",
      creationTime: new Date().toDateString(),
      phoneNumber: res.phoneNumber?.trim() || "",
      role: "user",
      loginType: "email and password",
      fid: await createUniqFid(res.uid),
      profilePhoto: createProfilePicture()
    };
    await setUserToDB(user, res.uid);
    dispatch(authStop());
    return user;
  } catch (error) {
    dispatch(authFailure(getFirebaseAuthErrorMessage(error) || error.message));
  }
};

//log in
export const logIn = (userData) => async (dispatch) => {
  try {
    dispatch(authStart());

    const res = await loginFB(userData.email, userData.password);
    if (!res || !res.uid) {
      throw new Error(
        "The connection with the server failed, please check your internet connection."
      );
    }

    if (res.emailVerified) {
      const getUser = await getOneUserFromDB(res.uid);
      const user = {
        uid: getUser.uid,
        displayName: getUser.displayName ?? "",
        userName: getUser.userName ?? "",
        email: getUser.email ?? userData.email,
        birthDay: getUser.birthDay ?? "",
        creationTime: getUser.creationTime ?? "",
        phoneNumber: getUser.phoneNumber ?? "",
        role: getUser.role ?? "user",
        loginType: "email and password",
        lastLogin: new Date().toISOString(),
        fid: await createUniqFid(getUser.uid),
        profilePhoto: getUser.profilePhoto?.trim()
      };

      dispatch(authSuccess(user));

      await setUserToDB(user, res.uid);

      return user;
    } else {
      dispatch(
        authFailure(
          "Please check that you have verified your account by email."
        )
      );
    }
  } catch (error) {
    dispatch(authFailure(getFirebaseAuthErrorMessage(error)));
  }
};

// reset password
export const ResetPassword = (email) => async (dispatch) => {
  try {
    dispatch(authStart());
    await resetPasswordFB(email);
    return true;
  } catch (error) {
    dispatch(authFailure(getFirebaseAuthErrorMessage(error)));
    return false;
  } finally {
    dispatch(authStop());
  }
};

//sign out
export const signOut = () => async (dispatch) => {
  try {
    dispatch(authStart());
    await logoutFB();
    await dispatch(logout());
    return true;
  } catch (error) {
    await dispatch(authFailure(getFirebaseAuthErrorMessage(error)));
    return false;
  } finally {
    await dispatch(authStop());
  }
};

//Log in with google
export const loginWithGoogle = () => async (dispatch) => {
  dispatch(authStart());

  try {
    const res = await loginWithGoogleFB();
    const userData = await getOneUserFromDB(res.uid);
    const data = userData || res;
    let userName = (data.displayName || "").replace(/\s+/g, "");
    let uniqUserName = data.userName || await createUniqUserName(userName, data.uid);
    const user = {
      uid: data.uid,
      displayName: data.displayName || "",
      userName: uniqUserName,
      email: data.email || "",
      birthDay: data.birthDay || "",
      creationTime: res.metadata?.creationTime,
      phoneNumber: data.phoneNumber || "",
      role: data.role || "user",
      loginType: "google",
      lastLogin: new Date().toISOString(),
      fid: await createUniqFid(data.uid),
      profilePhoto: data.profilePhoto?.trim() || createProfilePicture()
    };
    await setUserToDB(user, res.uid);
    await dispatch(authSuccess(user));
    return user;
  } catch (error) {
    await dispatch(authFailure(getFirebaseAuthErrorMessage(error)));
  }
};

//Log in with facebook
export const loginWithFacebook = () => async (dispatch) => {
  await dispatch(authStart());
  try {
    const res = await loginWithFacebookFB();
    const userData = await getOneUserFromDB(res.uid);
    const data = userData || res;
    let userName = (data.displayName || "").replace(/\s+/g, "");
    let uniqUserName = data.userName || await createUniqUserName(userName, data.uid);
    const user = {
      uid: data.uid,
      displayName: data.displayName || "",
      userName: uniqUserName,
      email: data.email || "",
      birthDay: data.birthDay || "",
      creationTime: res.metadata?.creationTime,
      phoneNumber: data.phoneNumber || "",
      role: data.role || "user",
      loginType: "facebook",
      lastLogin: new Date().toISOString(),
      fid: await createUniqFid(data.uid),
      profilePhoto: data.profilePhoto?.trim() || createProfilePicture()

    };

    await setUserToDB(user, data.uid);
    await dispatch(authSuccess(user));
    return user;
  } catch (error) {
    await dispatch(authFailure(getFirebaseAuthErrorMessage(error)));
    throw new Error(error.message);
  }
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: "",
  },
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = "";
    },
    authStop: (state) => {
      state.loading = false;
      state.error = "";
    },
    authSuccess: (state, action) => {
      state.user = action.payload;
      state.role = action.payload.role;
      state.loginType = action.payload.loginType;
      state.loading = false;
      state.error = "";
    },
    authFailure: (state, action) => {
      state.user = {};
      state.role = "guest";
      state.loginType = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = {};
      state.role = "guest";
      state.loginType = null;
      state.loading = false;
      state.error = "";
    },
  },
});

// Export actions
export const { logout, authStart, authSuccess, authFailure, authStop } =
  authSlice.actions;

// Export reducer
export default authSlice.reducer;
