import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  showCloseIcon?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
}

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  title,
  children,
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
        {title || ""}
        {showCloseIcon && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent dividers>{children}</DialogContent>

      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

export default GenericModal;
