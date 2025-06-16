import { styled, keyframes } from "@mui/material/styles";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Box,
} from "@mui/material";

export const WrapApp = styled(Box)({
  display: "flex",
  flexDirection: "column",
});

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
  50% {
    transform: scale(1.15);
    box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.4);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2);
  }
`;

export const UploadFab = styled(Fab, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate }) => ({
  position: "fixed",
  bottom: 80,
  right: 16,
  animation: animate ? `${pulse} 1.5s infinite` : "none",
}));

export const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: "calc(64px + env(safe-area-inset-bottom))",
  paddingBottom: "env(safe-area-inset-bottom)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
  zIndex: 1000,
}));

export const StyledBottomNavigationAction = styled(BottomNavigationAction, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ selected, theme }) => ({
  color: selected ? theme.palette.primary.main : theme.palette.text.secondary,
}));

export const WrapRoutes = styled(Box)({
  flex: 1,
  overflow: "auto",
  padding: "16px",
  paddingBottom: "56px",
  marginBottom: "64px",
});
