import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { createContext, useContext, useState } from "react";

export const MessageSnackbarContext = createContext();

export const MessageSnackbarContextProvider = (props) => {
  const [snackState, setSnackState] = useState({
    isOpen: false,
    type: "",
    message: "",
  });

  const showMessageSnackbar = (isOpen, type, message) => {
    setSnackState({
      isOpen: isOpen,
      type: type,
      message: message,
    });
  };

  return (
    <MessageSnackbarContext.Provider
      value={{ snackState, showMessageSnackbar: showMessageSnackbar }}
    >
      {props.children}
    </MessageSnackbarContext.Provider>
  );
};

export const MessageSnackbar = () => {
  const { snackState, showMessageSnackbar } = useContext(
    MessageSnackbarContext
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    showMessageSnackbar(false, snackState.type, "");
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={snackState.isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={snackState.type}>
          {snackState.message}
        </Alert>
      </Snackbar>
    </div>
  );
};
