import React from "react";
import classes from "./CustomModal.module.css";

function CustomModal({ children, modalVisible, setModalVisible }) {
  const modalClasses = [classes.CustomModal];

  if (modalVisible) {
    modalClasses.push(classes.active);
  }
  return (
    <div
      className={modalClasses.join(" ")}
      onClick={() => setModalVisible(false)}
    >
      <div
        className={classes.CustomModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export default CustomModal;
