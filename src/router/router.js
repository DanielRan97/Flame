import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../containers/homePge/homePage";
import Auth from "../containers/auth/auth";



const RouterHandler = () => {
    return (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<HomePage />} /> {/* Catch-all for 404 */}
        </Routes>
    );
  };
  export default RouterHandler;