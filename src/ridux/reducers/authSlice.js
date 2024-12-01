import { createSlice } from "@reduxjs/toolkit";
import { signUpFB, loginFB, logoutFB, resetPasswordFB, loginWithGoogleFB, loginWithFacebookFB } from "../../firebase/firebaseFunctions";
import { setUserToDB, getOneUserFromDB, checkIfUserNameExistDB, checkIfEmailExistDB } from "../../firebase/firebaseDB";

//sign up
export const signUp = (userData) => async (dispatch) => {
  try {
    dispatch(authStart());

    const emailExist = await checkIfEmailExistDB(userData.email);
    if(emailExist === true){
      throw new Error(`${userData.email} already exists, try to log in`);
    }

    const userNameExist = await checkIfUserNameExistDB(userData.userName);
    if(userNameExist === true){
      throw new Error(`${userData.userName} already exists, choose another user name`);
    }

    const res = await signUpFB(userData.email, userData.password);

    if (!res || !res.uid) {
      throw new Error("The connection with the server failed, please check your internet connection");
    }

    const user = {
      uid: res.uid,
      name: userData.name?.trim() + " " +  userData.lastName?.trim()|| "",
      userName: userData.userName?.trim() || "",
      email: userData.email?.trim() || "",
      birthDay: userData.birthDay?.trim() || "",
      creationTime: new Date().toDateString(),
      photoURL: res.photoURL?.trim() || "",
      phoneNumber: res.phoneNumber?.trim() || "",
      role: "user",
      loginType: "email and password",
    };
    await setUserToDB(user, res.uid);
    dispatch(authStop());
    return user;
  } catch (error) {
    dispatch(authFailure(error.message || "An error occurred during sign-up."));
  }
};


//log in
export const logIn = (userData) => async (dispatch) => {
  try {
    dispatch(authStart());

    const res = await loginFB(userData.email, userData.password);
    if (!res || !res.uid) {
      throw new Error("The connection with the server failed, please check your internet connection.");
    }

    if (res.emailVerified) {
      const getUser = await getOneUserFromDB(res.uid);
      const user = {
        uid: getUser.data.uid,
        name: getUser.data.name ?? "",
        userName: getUser.data.userName ?? "",
        email: getUser.data.email ?? userData.email,
        birthDay: getUser.data.birthDay ?? "",
        creationTime: getUser.data.creationTime ?? "",
        photoURL: getUser.data.photoURL ?? "",
        phoneNumber: getUser.data.phoneNumber ?? "",
        role: getUser.data.role ?? "user",
        loginType: "email and password",
        lastLogin: new Date().toISOString()
      };

      dispatch(authSuccess(user));

      await setUserToDB(user, res.uid);

      return user;
    }else{
      throw new Error("Please check that you have verified your account by email.")
    }
  } catch (error) {
    const errorMessage =
      error.message || "An unexpected error occurred during login.";
    dispatch(authFailure(errorMessage));
    throw new Error(errorMessage);
  }
};

// reset password
export const ResetPassword = (email) => async(dispatch) => {
try{
  dispatch(authStart());
  await resetPasswordFB(email);
  return true;
}catch (error) {
  dispatch(authFailure("The connection with the server failed, please check your internet connection."));
  return false;
}finally{
  dispatch(authStop());
};
};

//sign out
export const signOut = () => async (dispatch) => {
  try {
    dispatch(authStart());
    await logoutFB();
    dispatch(logout());
  } catch (error) {
    dispatch(authFailure("The connection with the server failed, please check your internet connection."));
  } finally {
    dispatch(authStop());
  }
};

//Log in with google
export const loginWithGoogle = () => async (dispatch) =>{
  dispatch(authStart());
  try {
    const res = await loginWithGoogleFB();
    const user = {
      uid: res.uid,
      name: res.displayName ?? "",
      userName: res.displayName.replace(/\s+/g, "") ?? "",
      email: res.email ?? "",
      birthDay: res.birthDay ?? "",
      creationTime: res.metadata.creationTime ?? "",
      photoURL: res.photoURL ?? "",
      phoneNumber: res.phoneNumber ?? "",
      role: res.role ?? "user",
      loginType: "google",
      lastLogin: new Date().toISOString()
    };
    await setUserToDB(user, res.uid);
    dispatch(authSuccess(user));
    return user;
  } catch (error) {
    dispatch(authFailure("failed to log in with google."));
  };
};

//Log in with facebook
export const loginWithFacebook = () => async (dispatch) =>{
  dispatch(authStart());
  try {
    const res = await loginWithFacebookFB();
    console.log(res);
    const user = {
      uid: res.uid,
      name: res.displayName ?? "",
      userName: res.displayName.replace(/\s+/g, "") ?? "",
      email: res.email ?? "",
      birthDay: res.birthDay ?? "",
      creationTime: res.metadata.creationTime ?? "",
      photoURL: res.photoURL ?? "",
      phoneNumber: res.phoneNumber ?? "",
      role: res.role ?? "user",
      loginType: "facebook",
      lastLogin: new Date().toISOString()
    };
    await setUserToDB(user, res.uid);
    dispatch(authSuccess(user));
    return true;
  } catch (error) {
    dispatch(authFailure("failed to log in with facebook."));
    return false;
  };
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
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
export const { logout, authStart, authSuccess, authFailure, authStop } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
