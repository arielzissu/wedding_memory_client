import React, { useState } from "react";
import PhotoDisplayGrid from "components/PhotoDisplayGrid/PhotoDisplayGrid";
import { ICloudinaryFile } from "types";
import { Box, Typography } from "@mui/material";

type IUserPhotosProps = {
  loggedUserFiles: ICloudinaryFile[];
  setLoggedUserFiles: React.Dispatch<React.SetStateAction<ICloudinaryFile[]>>;
};

const UserPhotos = ({
  loggedUserFiles,
  setLoggedUserFiles,
}: IUserPhotosProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!loggedUserFiles.length) {
    return (
      <Box display={"flex"} flexDirection={"column"}>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          You have not uploaded any photos yet.
        </Typography>
        <Typography variant="body2" textAlign="center" sx={{ mb: 2 }}>
          For uploading photos, please click on the upload icon in the bottom
          right corner.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h5" textAlign="left" sx={{ mb: 2 }}>
        My photos:
      </Typography>

      <PhotoDisplayGrid
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        files={loggedUserFiles}
        setFiles={setLoggedUserFiles}
        isDeletable={true}
      />
    </>
  );
};

export default UserPhotos;
