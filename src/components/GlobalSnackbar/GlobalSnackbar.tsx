import React from "react";
import { observer } from "mobx-react-lite";
import { Snackbar, Alert } from "@mui/material";
import snackbarStore from "stores/snackbarStore";

const GlobalSnackbar = observer(() => {
  const { open, message, severity, duration, close } = snackbarStore;

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={(_, reason) => {
        if (reason === "clickaway") return;
        close();
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={close}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message.split("\n").map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Alert>
    </Snackbar>
  );
});

export default GlobalSnackbar;
