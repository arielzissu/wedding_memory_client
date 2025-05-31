import { makeAutoObservable } from "mobx";
import { AlertColor } from "@mui/material";

class SnackbarStore {
  open = false;
  message = "";
  severity: AlertColor = "info";
  duration: number | null = 5000;

  constructor() {
    makeAutoObservable(this);
  }

  show = (
    message: string,
    severity: AlertColor = "info",
    duration?: number | null
  ) => {
    this.message = message;
    this.severity = severity;
    this.duration =
      duration === undefined
        ? 5000
        : duration !== null && duration > 0
        ? duration
        : null;
    this.open = true;
  };

  close = () => {
    this.open = false;
  };
}

const snackbarStore = new SnackbarStore();
export default snackbarStore;
