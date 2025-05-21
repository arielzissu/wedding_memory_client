import React, { useState } from "react";
import { IR2File } from "../../types";
import { ContainImageGallery } from "./ImageGallery.style";
import PhotoDisplayGrid from "components/PhotoDisplayGrid/PhotoDisplayGrid";
import { Typography } from "@mui/material";

interface ImageGalleryProps {
  files: IR2File[];
  setFiles: React.Dispatch<React.SetStateAction<IR2File[]>>;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ files, setFiles }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <ContainImageGallery>
      <Typography variant="h5" textAlign="left" sx={{ mb: 2 }}>
        Image Gallery:
      </Typography>

      <PhotoDisplayGrid
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        files={files}
        setFiles={setFiles}
      />
    </ContainImageGallery>
  );
};

export default ImageGallery;
