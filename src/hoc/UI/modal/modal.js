import React from "react";
import classes from "./modal.module.css";


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={classes.modalOverlay} onClick={onClose}>
      <div className={classes.modalFullScreen} onClick={(e) => e.stopPropagation()}>
        <button className={classes.modalClose} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;