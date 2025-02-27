import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getImages } from "api/cloudinary";
import { ICloudinaryFile } from "../../types";
import { getUrlSearchParams } from "utils/navigation";
import { ContainImageGallery } from "./ImageGallery.style";
import ImageList from "components/ImageList/ImageList";

const ImageGallery = () => {
  const [files, setFiles] = useState<ICloudinaryFile[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const relevantFile = getUrlSearchParams("f");

  const fetchImages = async () => {
    setIsLoadingImages(true);
    const response = await getImages(relevantFile);
    const oldImageList = [...response.images, ...response.videos];
    setFiles((prevFiles) => [...prevFiles, ...oldImageList]);
    setIsLoadingImages(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <ContainImageGallery>
      <h1>Image Gallery</h1>

      {isLoadingImages ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        <ImageList
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          files={files}
          setFiles={setFiles}
        />
      )}
    </ContainImageGallery>
  );
};

export default ImageGallery;
