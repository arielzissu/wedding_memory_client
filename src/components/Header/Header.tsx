import React from "react";
import { Avatar, Typography, Box } from "@mui/material";
import { ILocalUser } from "types";

interface HeaderProps {
  user?: ILocalUser;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h4" fontWeight={600}>
        Wedding Memory
      </Typography>
      {user && (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar src={user.picture} alt={user.name} />
          <Typography sx={{ ml: 1 }}>{user.name}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Header;
