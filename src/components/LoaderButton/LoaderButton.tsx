import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledButton } from "./LoaderButton.style";

interface LoaderButtonProps {
  isLoading: boolean;
  buttonText: string;
  onClick: () => void;
  startIcon?: React.ReactNode;
  disabled?: boolean;
}

const LoaderButton: React.FC<LoaderButtonProps> = ({
  onClick,
  isLoading,
  buttonText,
  startIcon,
  disabled = false,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      variant="contained"
      startIcon={!isLoading ? startIcon : undefined}
      disabled={disabled || isLoading}
    >
      {isLoading ? <CircularProgress size={24} color="inherit" /> : buttonText}
    </StyledButton>
  );
};

export default LoaderButton;
