import React, { useState } from "react";
import PhotoDisplayGrid from "components/PhotoDisplayGrid/PhotoDisplayGrid";
import { IR2File } from "types";
import {
  CounterText,
  GradientButton,
  StyledTitle,
  UploaderArea,
  UploaderAreaNote,
  UploaderAreaSubtitle,
  UploaderAreaTitle,
  WrapCameraIcon,
} from "./UserPhotos.styles";
import {
  FileUpload as UploadFile,
  CameraAltOutlined,
} from "@mui/icons-material";

type IUserPhotosProps = {
  loggedUserFiles: IR2File[];
  setLoggedUserFiles: React.Dispatch<React.SetStateAction<IR2File[]>>;
  onClickFileInput: () => void;
};

const UserPhotos = ({
  loggedUserFiles,
  setLoggedUserFiles,
  onClickFileInput,
}: IUserPhotosProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filesLength = loggedUserFiles?.length;

  const handleButtonClick = () => {
    onClickFileInput();
  };

  const onClickUploadPhoto = () => {
    onClickFileInput();
  };

  const UploadArea = () => {
    return (
      <UploaderArea overrideBgColor={"white"}>
        <WrapCameraIcon>
          <CameraAltOutlined sx={{ color: "#f43f5f", width: 32, height: 32 }} />
        </WrapCameraIcon>
        <UploaderAreaTitle>Share Your Wedding Memories</UploaderAreaTitle>
        <UploaderAreaSubtitle>
          Upload photos and video from this special day
        </UploaderAreaSubtitle>
        <GradientButton
          variant="outlined"
          startIcon={<UploadFile />}
          onClick={handleButtonClick}
        >
          Choose Files
        </GradientButton>
        <UploaderAreaNote>
          Drag & drop files here or click to upload
        </UploaderAreaNote>
      </UploaderArea>
    );
  };

  if (!loggedUserFiles) {
    return (
      <>
        <StyledTitle>My Wedding Memories</StyledTitle>
        <CounterText>
          No memories captured yet. Start by uploading your photos!
        </CounterText>
      </>
    );
  }

  return (
    <>
      <StyledTitle>My Wedding Memories</StyledTitle>
      <CounterText>{filesLength} memories captured</CounterText>

      {filesLength > 0 && (
        <GradientButton
          startIcon={<CameraAltOutlined />}
          sx={{ fontWeight: 600 }}
          onClick={onClickUploadPhoto}
        >
          Add New Memories
        </GradientButton>
      )}

      {filesLength === 0 && <UploadArea />}

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
