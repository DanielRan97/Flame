import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../containers/homePge/homePage";
import Auth from "../containers/auth/auth";
import MyFlameContainer from "../containers/myFlame/myFlame";
import { useSelector } from "react-redux";

const RouterHandler = () => {
  // Check if the user is authenticated
  const isAuth = useSelector((state) => state.auth.user?.uid);

  return (
    <Routes>
      {/* Authenticated route */}
      {isAuth ? (
        <Route path="/myFlame" element={<MyFlameContainer />} />
      ) : (
        // Unauthenticated route
        <Route path="/auth" element={<Auth />} />
      )}
      {/* Always accessible routes */}
      <Route path="/" element={<HomePage />} />
      
      {/* Redirect unknown routes to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default RouterHandler;

