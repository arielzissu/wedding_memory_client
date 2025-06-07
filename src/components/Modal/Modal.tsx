import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  actions?: React.ReactNode;
  showCloseIcon?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  title = "",
  description = "",
  actions,
  showCloseIcon = true,
  maxWidth = "sm",
  fullWidth = true,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {title}
        {showCloseIcon && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent dividers>
        <Typography>{description}</Typography>
      </DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default GenericModal;
