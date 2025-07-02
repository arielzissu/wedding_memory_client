import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

export const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const CancelButton = styled(Button)({
  color: "#db2777",
});
