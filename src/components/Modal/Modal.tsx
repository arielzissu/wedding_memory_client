import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { StyledDialogTitle } from "./Modal.style";
import LoaderButton from "components/LoaderButton/LoaderButton";

interface GenericModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  showCloseIcon?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  isLoadingConfirm?: boolean;
  onClickConfirmButton?: () => void;
  onClickCancelButton?: () => void;
}

const GenericModal: React.FC<GenericModalProps> = ({
  open,
  onClose,
  title = "",
  description = "",
  confirmButtonText = "",
  cancelButtonText = "",
  showCloseIcon = true,
  maxWidth = "sm",
  fullWidth = true,
  isLoadingConfirm = false,
  onClickConfirmButton = () => {},
  onClickCancelButton = () => {},
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
    >
      <StyledDialogTitle>
        {title}
        {showCloseIcon && (
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        )}
      </StyledDialogTitle>

      <DialogContent dividers>
        <Typography>{description}</Typography>
      </DialogContent>

      <DialogActions>
        {cancelButtonText !== "" && (
          <Button onClick={onClickCancelButton}>{cancelButtonText}</Button>
        )}
        <LoaderButton
          onClick={onClickConfirmButton}
          isLoading={isLoadingConfirm}
          buttonText={confirmButtonText}
        />
      </DialogActions>
    </Dialog>
  );
};

export default GenericModal;
