import React from "react";
import classes from "./CustomButton.module.css";

function CustomButton({ children, ...props }) {
  return (
    <button {...props} className={classes.customButton}>
      {children}
    </button>
  );
}

export default CustomButton;
