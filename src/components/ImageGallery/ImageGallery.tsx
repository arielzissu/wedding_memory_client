import React, { useState } from "react";
import { ICloudinaryFile } from "../../types";
import { ContainImageGallery } from "./ImageGallery.style";
import ImageList from "components/ImageList/ImageList";
import { Typography } from "@mui/material";

interface ImageGalleryProps {
  files: ICloudinaryFile[];
  setFiles: React.Dispatch<React.SetStateAction<ICloudinaryFile[]>>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ files, setFiles }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <ContainImageGallery>
      <Typography variant="h5" textAlign="left" sx={{ mb: 2 }}>
        Image Gallery:
      </Typography>

      <ImageList
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        files={files}
        setFiles={setFiles}
      />
    </ContainImageGallery>
  );
};

export default ImageGallery;
