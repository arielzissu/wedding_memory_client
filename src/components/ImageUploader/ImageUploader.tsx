import React, { useState, useEffect } from "react";
import { UploadContainer } from "./ImageUploader.styles";
import { getImages, uploadImages } from "api/cloudinary";
import LoginModal, { USER_EMAIL_KEY } from "../Login/Login";
import { getUrlSearchParams } from "utils/navigation";
import { getFromLocalStorage } from "utils/localStorage";
import { ICloudinaryFile } from "types";
import { SUPPORTED_MEDIA_FORMATS } from "constants/file";
import { Button, Typography, Box, CircularProgress } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageList from "components/ImageList/ImageList";

const MAX_SIZE_IN_BYTES = 0.5 * 1024 * 1024 * 1024; // = 0.5 GB
const MAX_SIZE_IN_GB = MAX_SIZE_IN_BYTES / (1024 * 1024 * 1024);

const ImageUploader = () => {
  const [files, setFiles] = useState<ICloudinaryFile[]>([]);
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>();
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

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
      console.warn("The total file size exceeds 0.5 GB.");
      return;
    }

    selectedFiles.forEach((file) => {
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
      console.error("Upload failed", err);
    } finally {
      setIsLoadingUpload(false);
    }
  };

  const onClickFileInput = (event) => {
    if (!userEmail) {
      event.preventDefault();
      setIsOpenLoginModal(true);
      return;
    }
  };

  return (
    <>
      <UploadContainer>
        <Typography variant="h6">
          Click to upload: (limit {MAX_SIZE_IN_GB} GB)
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

      <ImageList
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        files={files}
        setFiles={setFiles}
      />

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
