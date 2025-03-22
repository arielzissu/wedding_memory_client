import React, { useState } from "react";
import { Typography, Box, Button, Popover } from "@mui/material";
import { ILocalUser } from "types";
import { AvatarImg } from "./Header.styles";
import GoogleIcon from "@mui/icons-material/Google";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        m: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src="/logo512.png"
          style={{
            width: "2rem",
            height: "2rem",
            marginRight: "0.5rem",
          }}
        />
        <Typography
          variant="h4"
          fontWeight={600}
          sx={{ fontSize: { xs: "1rem", sm: "2rem", md: "2.5rem" } }}
        >
          Wedding Memory
        </Typography>
      </Box>
      {user ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
            <Box sx={{ p: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Signed in as <strong>{user.name}</strong>
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleClose();
                  onSignOut();
                }}
              >
                Sign Out
              </Button>
            </Box>
          </Popover>
        </Box>
      ) : (
        <Button
          variant="outlined"
          startIcon={
            <GoogleIcon sx={{ fontSize: "1.5rem", color: "#1A1F2D" }} />
          }
          sx={{
            textTransform: "none",
            borderColor: "#1A1F2D",
            color: "#1A1F2D",
            borderRadius: 2,
          }}
          onClick={onSignIn}
        >
          Sign in with Google
        </Button>
      )}
    </Box>
  );
};

export default Header;
