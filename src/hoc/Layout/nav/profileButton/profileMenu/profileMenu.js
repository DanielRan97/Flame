import React, { useEffect } from "react";
import classes from "./profileMenu.module.css";
import Aux from "../../../../Auxiliary/Auxiliary.js";
import withClass from "../../../../withClass/withClass.js";
import { useTheme } from "../../../../../contexts/ThemeContext/ThemeContext.js";

const ProfileMenu = () => {
  const { theme, toggleTheme } = useTheme();
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Aux>
      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Theme
      </button>
    </Aux>
  );
};

export default withClass(ProfileMenu, classes.ProfileMenu);
