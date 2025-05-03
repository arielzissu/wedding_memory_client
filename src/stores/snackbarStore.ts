import { makeAutoObservable } from "mobx";
import { AlertColor } from "@mui/material";

class SnackbarStore {
  open = false;
  message = "";
  severity: AlertColor = "info";

  constructor() {
    makeAutoObservable(this);
  }

  show = (message: string, severity: AlertColor = "info") => {
    this.message = message;
    this.severity = severity;
    this.open = true;
  };

  close = () => {
    this.open = false;
  };
}

const snackbarStore = new SnackbarStore();
export default snackbarStore;
