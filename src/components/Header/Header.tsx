import React, { useState } from "react";
import { Button, Popover } from "@mui/material";
import { ILocalUser } from "types";
import {
  AvatarImg,
  HeaderTitle,
  LogoImage,
  SignedInText,
  SignInButton,
  StyledGoogleIcon,
  WrapHeader,
  WrapLogin,
  WrapLogout,
  WrapTitle,
} from "./Header.styles";

interface HeaderProps {
  user?: ILocalUser;
  onSignOut: () => void;
  onSignIn: () => void;
}

const Header = ({ user, onSignOut, onSignIn }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "user-popover" : undefined;

  return (
    <WrapHeader>
      <WrapTitle>
        <LogoImage
          src="/logo512.png"
          style={{
            width: "2rem",
            height: "2rem",
            marginRight: "0.5rem",
          }}
        />
        <HeaderTitle variant="h4">Wedding Memory</HeaderTitle>
      </WrapTitle>
      {user ? (
        <WrapLogin>
          <AvatarImg
            src={user.picture}
            alt={user.name}
            referrerPolicy="no-referrer"
            onClick={handleAvatarClick}
          />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <WrapLogout>
              <SignedInText variant="body1">
                Signed in as <strong>{user.name}</strong>
              </SignedInText>
              <Button
                sx={{
                  background: "linear-gradient(to right, #f43f5e, #ec4899)",
                }}
                variant="contained"
                color="primary"
                onClick={() => {
                  handleClose();
                  onSignOut();
                }}
              >
                Sign Out
              </Button>
            </WrapLogout>
          </Popover>
        </WrapLogin>
      ) : (
        <SignInButton
          variant="outlined"
          startIcon={<StyledGoogleIcon />}
          onClick={onSignIn}
        >
          Sign in
        </SignInButton>
      )}
    </WrapHeader>
  );
};

export default Header;
