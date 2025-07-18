import React, { useState } from "react";
import { IR2File } from "../../types";
import {
  ContainImageGallery,
  CountsGrid,
  StatCard,
  StatLabel,
  StatNumber,
  StatText,
  StyledSubtitle,
  StyledTab,
  StyledTabs,
  StyledTitle,
} from "./ImageGallery.style";
import PhotoDisplayGrid from "components/PhotoDisplayGrid/PhotoDisplayGrid";
import { Box } from "@mui/material";
import {
  UploaderArea,
  UploaderAreaSubtitle2,
  UploaderAreaTitle,
  WrapCameraIcon,
} from "components/UserPhotos/UserPhotos.styles";
import {
  FavoriteBorder,
  Group,
  CameraAltOutlined,
  VideoCameraFrontOutlined,
} from "@mui/icons-material";

interface ImageGalleryProps {
  files: IR2File[];
  setFiles: React.Dispatch<React.SetStateAction<IR2File[]>>;
}

interface IUploadArea {
  title: string;
  subTitle: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ files, setFiles }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [tabIndex, setTabIndex] = useState(0);

  const { photos, videos, uploaderList } = files.reduce(
    (
      acc: {
        photos: IR2File[];
        videos: IR2File[];
        uploaderList: { [uploader: string]: number };
      },
      file: IR2File
    ) => {
      if (file.type === "video") {
        acc.videos.push(file);
      } else {
        acc.photos.push(file);
      }
      const uploader = file.metadata.uploader;
      acc.uploaderList[uploader] = (acc.uploaderList[uploader] || 0) + 1;
      return acc;
    },
    { photos: [], videos: [], uploaderList: {} }
  );

  const uploaderNumbers = Object.keys(uploaderList)?.length || 0;

  const getUploadAreaTitle = (): string => {
    if (tabIndex === 0) {
      return "No memories yet";
    }
    if (tabIndex === 1) {
      return "No photos yet";
    }
    if (tabIndex === 2) {
      return "No videos yet";
    }
    return "No memories yet";
  };

  const getUploadAreaSubtitle = (): string => {
    if (tabIndex === 0) {
      return "Wedding guests haven't shared any photos or videos yet";
    }
    if (tabIndex === 1) {
      return "Wedding guests haven't shared any images yet";
    }
    if (tabIndex === 2) {
      return "Wedding guests haven't shared any videos yet";
    }
    return "Wedding guests haven't shared any photos or videos yet";
  };

  const MemoryCounts = () => {
    return (
      <CountsGrid>
        <StatCard gradient="rose" color="#f43f5e">
          <CameraAltOutlined className="icon rose" />
          <StatText>
            <StatNumber>{photos.length}</StatNumber>
            <StatLabel>Photos</StatLabel>
          </StatText>
        </StatCard>

        <StatCard gradient="purple" color="#a855f7">
          <VideoCameraFrontOutlined className="icon purple" />
          <StatText>
            <StatNumber>{videos.length}</StatNumber>
            <StatLabel>Videos</StatLabel>
          </StatText>
        </StatCard>

        <StatCard gradient="amber" color="#f59e0b">
          <Group className="icon amber" />
          <StatText>
            <StatNumber>{uploaderNumbers}</StatNumber>
            <StatLabel>Guests</StatLabel>
          </StatText>
        </StatCard>
      </CountsGrid>
    );
  };

  const UploadArea = ({ title, subTitle }: IUploadArea) => {
    // TODO: make this component generic for use in few places (also called in UserPhotos)
    return (
      <UploaderArea>
        <WrapCameraIcon>
          <FavoriteBorder sx={{ color: "#f43f5f", width: 32, height: 32 }} />
        </WrapCameraIcon>
        <UploaderAreaTitle>{title}</UploaderAreaTitle>
        <UploaderAreaSubtitle2>{subTitle}</UploaderAreaSubtitle2>
      </UploaderArea>
    );
  };

  const getPhotosToDisplay = () => {
    if (tabIndex === 0) {
      return files;
    }
    if (tabIndex === 1) {
      return photos;
    }
    if (tabIndex === 2) {
      return videos;
    }
    return files;
  };

  return (
    <ContainImageGallery>
      <StyledTitle>Wedding Gallery</StyledTitle>

      <StyledSubtitle>Shared memories from all our guests</StyledSubtitle>

      <MemoryCounts />

      <Box maxWidth={400} mx="auto" mb={3}>
        <StyledTabs
          value={tabIndex}
          onChange={(_e, newValue) => setTabIndex(newValue)}
        >
          <StyledTab label="All" />
          <StyledTab label="Photos" />
          <StyledTab label="Videos" />
        </StyledTabs>
      </Box>

      {files.length === 0 && (
        <UploadArea
          title={getUploadAreaTitle()}
          subTitle={getUploadAreaSubtitle()}
        />
      )}

      <PhotoDisplayGrid
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        files={getPhotosToDisplay()}
        setFiles={setFiles}
      />
    </ContainImageGallery>
  );
};

export default ImageGallery;
