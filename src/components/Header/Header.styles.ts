import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";
import { Box, Button, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"; // or your specific import

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
  margin: "16px",
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

export const StyledGoogleIcon = styled(GoogleIcon)({
  fontSize: "1.5rem",
  color: "#1A1F2D",
});

export const SignInButton = styled(Button)({
  textTransform: "none",
  borderColor: "#1A1F2D",
  color: "#1A1F2D",
  borderRadius: 8,
});

export const HeaderTitle = MuiStyled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "1rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
}));

export const LogoImage = styled("img")({
  width: "2rem",
  height: "2rem",
  marginRight: "0.5rem",
});
