import React, { useState, useEffect } from "react";
import { ResourceType } from "cloudinary";
import { UploadContainer } from "./ImageUploader.styles";
import { deleteImage, getImages, uploadImages } from "api/cloudinary";
import LoginModal, { USER_EMAIL_KEY } from "../Login/Login";
import { getUrlSearchParams } from "utils/navigation";
import { getFromLocalStorage } from "utils/localStorage";
import { ICloudinaryFile } from "types";
import { SUPPORTED_MEDIA_FORMATS } from "constants/file";
import {
  Button,
  Typography,
  Box,
  Card,
  CardMedia,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import Grid from "@mui/material/Grid2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const MAX_SIZE_IN_BYTES = 0.5 * 1024 * 1024 * 1024; // = 0.5 GB
const MAX_SIZE_IN_GB = MAX_SIZE_IN_BYTES / (1024 * 1024 * 1024);

const ImageUploader = () => {
  const [files, setFiles] = useState<ICloudinaryFile[]>([]);
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);

  const relevantFile = getUrlSearchParams("f");

  const fetchImages = async () => {
    if (userEmail) {
      const response = await getImages(relevantFile, userEmail);
      const oldImageList = [...response.images, ...response.videos];
      setFiles((prevFiles) => [...prevFiles, ...oldImageList]);
    }
  };

  const getUserEmail = () => {
    const localStorageEmail = getFromLocalStorage(USER_EMAIL_KEY);
    if (localStorageEmail) {
      setUserEmail(localStorageEmail.email);
    }
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  useEffect(() => {
    fetchImages();
  }, [userEmail]);

  const handleFileChange = async (event) => {
    event.preventDefault();
    if (!userEmail) {
      setIsOpenLoginModal(true);
      return;
    }
    const inputFiles = event.target.files;
    const selectedFiles: File[] = Array.from(inputFiles);
    const formData = new FormData();

    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);

    if (totalSize > MAX_SIZE_IN_BYTES) {
      console.warn(
        `The total file size exceeds the limit of 0.5 GB. Please upload smaller files. [totalSize=${totalSize}]`
      );
      // TODO: add toast message for the user that there is a limit for the upload files size of 0.5 GB
      return;
    }

    selectedFiles.forEach((file: string | Blob) => {
      formData.append("images", file);
    });

    try {
      setIsLoadingUpload(true);
      const uploadImagesResponse = await uploadImages(
        formData,
        relevantFile,
        userEmail
      );
      const uploadedImage = uploadImagesResponse.imageUrls;
      setFiles((prevFiles) => [...prevFiles, ...uploadedImage]);
    } catch (err) {
      // TODO: handle failed to upload...
    } finally {
      setIsLoadingUpload(false);
    }
  };

  const handleDelete = async (
    index: number,
    publicId: string,
    resourceType: ResourceType
  ) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    await deleteImage(publicId, resourceType);
  };

  const renderPreview = (file: ICloudinaryFile, index: number) => {
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
        <Card sx={{ position: "relative" }}>
          {file.type === "image" ? (
            <CardMedia component="img" image={file.url} alt="Uploaded image" />
          ) : (
            <CardMedia
              component="video"
              controls
              src={file.url}
              // poster={file.thumbnail}
            />
          )}
          <IconButton
            sx={{
              position: "absolute",
              top: 5,
              right: 5,
              bgcolor: "rgba(255,255,255,0.7)",
            }}
            onClick={() => handleDelete(index, file.publicId, file.type)}
          >
            <Delete />
          </IconButton>
        </Card>
      </Grid>
    );
  };

  const onClickFileInput = (event) => {
    if (!userEmail) {
      event.preventDefault();
      setIsOpenLoginModal(true);
      return;
    }
  };

  if (!relevantFile) return <div>Error - Missing Data</div>;

  return (
    <>
      <UploadContainer>
        <Typography variant="h6">
          click to upload: (limit to {MAX_SIZE_IN_GB} GB)
        </Typography>
        <Button
          startIcon={<CloudUploadIcon />}
          variant="contained"
          sx={{ mt: 1 }}
          component="label"
          onClick={onClickFileInput}
          disabled={isLoadingUpload}
        >
          {isLoadingUpload ? (
            <Box display="flex" justifyContent="center" minWidth={"120px"}>
              <CircularProgress size={30} />
            </Box>
          ) : (
            <>
              <Typography>Upload Files</Typography>
              <input
                type="file"
                multiple
                accept={SUPPORTED_MEDIA_FORMATS.join()}
                hidden
                onChange={handleFileChange}
              />
            </>
          )}
        </Button>
      </UploadContainer>

      <Typography variant="h6" textAlign="left" sx={{ mb: 2 }}>
        Your uploaded list:
      </Typography>
      <Grid container spacing={2}>
        {files.map((file, index) => renderPreview(file, index))}
      </Grid>

      {isLoadingUpload && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {isOpenLoginModal && (
        <LoginModal
          isOpen={isOpenLoginModal}
          onClose={() => setIsOpenLoginModal(false)}
        />
      )}
    </>
  );
};

export default ImageUploader;
