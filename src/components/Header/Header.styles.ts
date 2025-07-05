import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import GoogleSVG from "../../svg/google";

export const AvatarImg = styled.img`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  font-size: 1.25rem;
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  color: #fff;
  background-color: #bdbdbd;
  text-align: center;
`;

export const WrapHeader = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#fef3f8",
}));

export const WrapTitle = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const WrapLogin = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

export const WrapLogout = styled(Box)({
  padding: "16px",
});

export const SignedInText = styled(Typography)({
  marginBottom: "8px",
});

export const StyledGoogleIcon = styled(GoogleSVG)({
  fontSize: "1.5rem",
  color: "#1A1F2D",
});

export const SignInButton = styled(Button)`
  border-color: #1a1f2d;
  color: #1a1f2d;
  border-radius: 8px;
  padding: 5px 12px !important;
  text-transform: capitalize !important;
`;

export const HeaderTitle = MuiStyled(Typography)(({ theme }) => ({
  color: "#de2260",
  fontSize: "1rem",
  lineHeight: "1.75rem",
  fontWeight: 600,
  [theme.breakpoints.up(374)]: {
    fontSize: "1.25rem",
  },
  [theme.breakpoints.up(424)]: {
    fontSize: "1.4rem",
  },
  [theme.breakpoints.up("sm")]: {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.75rem",
  },
}));

export const LogoImage = styled("img")({
  width: "2rem",
  height: "2rem",
  marginRight: "0.5rem",
});
