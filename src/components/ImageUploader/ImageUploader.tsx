import React, { useState, useEffect } from "react";
import { ResourceType } from "cloudinary";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import CloudUpload from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  PreviewImage,
  UploadContainer,
  PreviewVideo,
  PreviewItem,
  PreviewGrid,
  DeleteButton,
  ContainImageUploader,
} from "./ImageUploader.styles";
import { deleteImage, getImages, uploadImages } from "api/cloudinary";
import LoginModal, { USER_EMAIL_KEY } from "../Login/Login";
import { getUrlSearchParams } from "utils/navigation";
import { getFromLocalStorage } from "utils/localStorage";
import { ICloudinaryFile } from "types";

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
    if (!localStorageEmail) {
      setIsOpenLoginModal(true);
      return;
    }
    setUserEmail(localStorageEmail);
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
    const fileType = file.type;
    if (fileType === "image") {
      return (
        <>
          <DeleteButton
            onClick={() => handleDelete(index, file.publicId, file.type)}
          >
            <DeleteIcon />
          </DeleteButton>
          <PreviewImage src={file.url} alt={`Image-${index}`} />
        </>
      );
    } else if (fileType === "video") {
      return (
        <>
          <DeleteButton
            onClick={() => handleDelete(index, file.publicId, file.type)}
          >
            <DeleteIcon />
          </DeleteButton>
          <PreviewVideo controls src={file.url} poster={file.thumbnail} />
        </>
      );
    }
    return null;
  };

  const onClickFileInput = () => {
    if (!userEmail) {
      setIsOpenLoginModal(true);
      return;
    }
  };

  if (!relevantFile) return <div>Error - Missing Data</div>;

  return (
    <ContainImageUploader>
      <UploadContainer>
        <Typography variant="h6">
          click to upload: (limit to {MAX_SIZE_IN_GB} GB)
        </Typography>
        <Button
          startIcon={<CloudUpload />}
          variant="contained"
          component="label"
          onClick={onClickFileInput}
        >
          Upload Files
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </UploadContainer>
      {files.length > 0 && <div>Your uploaded list:</div>}
      {isLoadingUpload ? (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      ) : (
        files.length > 0 && (
          <PreviewGrid>
            {files.map((file, index) => (
              <PreviewItem key={index}>
                {renderPreview(file, index)}
              </PreviewItem>
            ))}
          </PreviewGrid>
        )
      )}
      {isOpenLoginModal && (
        <LoginModal
          isOpen={isOpenLoginModal}
          onClose={() => setIsOpenLoginModal(false)}
        />
      )}
    </ContainImageUploader>
  );
};

export default ImageUploader;
