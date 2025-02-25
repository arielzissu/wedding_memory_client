import React, { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { getImages } from "api/cloudinary";
import { ICloudinaryFile } from "../../types";
import { getUrlSearchParams } from "utils/navigation";
import {
  ContainAssetsList,
  ContainImageGallery,
  StyledImg,
  StyledVideo,
} from "./ImageGallery.style";

const ImageGallery = () => {
  const [images, setImages] = useState<ICloudinaryFile[]>([]);
  const [videos, setVideos] = useState<ICloudinaryFile[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(true);

  const relevantFile = getUrlSearchParams("f");

  const fetchImages = async () => {
    setIsLoadingImages(true);
    const response = await getImages(relevantFile);
    setIsLoadingImages(false);
    setImages(response.images);
    setVideos(response.videos);
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
        <ContainAssetsList>
          {images.map((image, index) => (
            <StyledImg
              key={`${image.publicId}-${index}`}
              src={image.url}
              alt={`Cloudinary ${index}`}
            />
          ))}
          {videos.map((video, index) => (
            <StyledVideo
              key={`${video.publicId}-${index}`}
              src={video.url}
              controls
            />
          ))}
        </ContainAssetsList>
      )}
    </ContainImageGallery>
  );
};

export default ImageGallery;
