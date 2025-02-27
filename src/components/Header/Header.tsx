import React from "react";
import { Typography, Box } from "@mui/material";
import { ILocalUser } from "types";
import { AvatarImg } from "./Header.styles";

interface HeaderProps {
  user?: ILocalUser;
}

const Header = ({ user }: HeaderProps) => {
  console.log("user.picture: ", user?.picture);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={600}
        sx={{ fontSize: { xs: "1rem", sm: "2rem", md: "2.5rem" } }}
      >
        Wedding Memory
      </Typography>
      {user && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 1 }}>{user.name}</Typography>
          <AvatarImg
            src={user.picture}
            alt={user.name}
            referrerPolicy="no-referrer"
          />
        </Box>
      )}
    </Box>
  );
};

export default Header;
