import React, { useState } from "react";
import ImageList from "components/ImageList/ImageList";
import { ICloudinaryFile } from "types";
import { Box, Typography } from "@mui/material";

type IImageUploaderProps = {
  files: ICloudinaryFile[];
  setFiles: React.Dispatch<React.SetStateAction<ICloudinaryFile[]>>;
  userEmail: string | undefined;
};

const ImageUploader = ({ files, setFiles, userEmail }: IImageUploaderProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const loggedUserFiles = files.filter((file) =>
    userEmail ? file.tags.includes(userEmail) : false
  );

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
        Your photos:
      </Typography>

      <ImageList
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        files={loggedUserFiles}
        setFiles={setFiles}
        isDeletable={true}
      />
    </>
  );
};

export default ImageUploader;
