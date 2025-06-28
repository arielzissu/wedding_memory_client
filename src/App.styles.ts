import { styled as muiStyled, keyframes } from "@mui/material/styles";
import styled from "styled-components";
import {
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  Box,
} from "@mui/material";

export const MainApp = styled.div`
  height: 100vh;
  background-color: #fef3f8;
`;

export const WrapVisualApp = muiStyled(Box)({
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

export const UploadFab = muiStyled(Fab, {
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>(({ animate }) => ({
  position: "fixed",
  bottom: 80,
  right: 16,
  backgroundColor: "rgb(225, 29, 72)",
  color: "white",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
  animation: animate ? `${pulse} 1.5s infinite` : "none",
  transition: "background-color 0.3s ease",

  "&:hover": {
    backgroundColor: "rgb(190, 18, 60)",
  },

  "&:disabled": {
    backgroundColor: "#ccc",
    color: "#666",
  },
}));

export const StyledBottomNavigation = muiStyled(BottomNavigation)(
  ({ theme }) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "calc(71px + env(safe-area-inset-bottom))",
    paddingBottom: "env(safe-area-inset-bottom)",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
    zIndex: 1000,
  })
);

export const StyledBottomNavigationAction = muiStyled(BottomNavigationAction, {
  shouldForwardProp: (prop) => prop !== "selected",
})<{ selected: boolean }>(({ selected }) => ({
  color: selected ? "rgb(225, 29, 72)" : "#888",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transitionDuration: "300ms",
  transitionProperty: "all",
  paddingTop: 3,
  paddingBottom: 3,

  "& .MuiBottomNavigationAction-label": {
    fontSize: "0.875rem",
    fontWeight: 500,
    marginTop: 4,
    color: selected ? "rgb(225, 29, 72)" : "#888",
    width: "max-content",
  },

  "& .MuiSvgIcon-root": {
    padding: 10,
    borderRadius: "16px",
    background: selected
      ? "linear-gradient(to bottom right, #f43f5e, #ec4899)"
      : "transparent",
    color: selected ? "white" : "rgb(107, 114, 128)",
    width: 36,
    height: 36,
  },
}));

export const WrapRoutes = muiStyled(Box)({
  flex: 1,
  overflow: "auto",
  padding: "16px",
  paddingBottom: "56px",
  marginBottom: "64px",
});

export const Indicator = styled("div")`
  position: absolute;
  top: 0;
  height: 4px;
  width: 40px;
  background-color: rgb(225, 29, 72);
  border-radius: 2px;
  transition: left 0.4s ease;
`;
