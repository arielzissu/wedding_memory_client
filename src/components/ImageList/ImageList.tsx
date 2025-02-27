import React from "react";
import { ResourceType } from "cloudinary";
import {
  Box,
  IconButton,
  Modal,
  Card,
  Grid2 as Grid,
  CardMedia,
} from "@mui/material";
import { Delete, Close } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperWrapper } from "./ImageList.styles";
import { ICloudinaryFile } from "types";
import { deleteImage } from "api/cloudinary";

interface ImageListProps {
  selectedIndex: number | null;
  files: ICloudinaryFile[];
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setFiles: React.Dispatch<React.SetStateAction<ICloudinaryFile[]>>;
}

const ImageList = ({
  selectedIndex,
  files,
  setSelectedIndex,
  setFiles,
}: ImageListProps) => {
  const handleDelete = async (
    index: number,
    publicId: string,
    resourceType: ResourceType
  ) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    await deleteImage(publicId, resourceType);
  };

  const onClickCard = (e, index) => {
    e.preventDefault();
    setSelectedIndex(index);
  };

  const renderPreview = (file: ICloudinaryFile, index: number) => {
    return (
      <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`asset-card-${index}`}>
        <Card
          sx={{ cursor: "pointer", position: "relative" }}
          onClick={(e) => onClickCard(e, index)}
        >
          {file.type === "image" ? (
            <CardMedia
              component="img"
              image={file.url}
              alt="Uploaded image"
              style={{
                width: "100%",
                minHeight: "300px",
                objectFit: "cover",
              }}
            />
          ) : (
            <video
              key={file.thumbnail}
              controls
              src={file.url}
              poster={file.thumbnail}
              style={{
                width: "100%",
                minHeight: "300px",
                objectFit: "cover",
              }}
              preload="metadata"
              onClick={(e) => onClickCard(e, index)}
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

  return (
    <>
      <Grid container spacing={2}>
        {files.map((file, index) => renderPreview(file, index))}
      </Grid>

      <Modal
        open={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 2,
            width: "90%",
            maxWidth: "600px",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              zIndex: 9,
              bgcolor: "rgba(255,255,255,0.7)",
            }}
            onClick={() => setSelectedIndex(null)}
          >
            <Close />
          </IconButton>

          <SwiperWrapper>
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={10}
              slidesPerView={1}
              navigation
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              loop
              initialSlide={selectedIndex || 0}
              style={{ height: "100%" }}
              onSlideChange={() => {
                document
                  .querySelectorAll("video")
                  .forEach((video) => video.pause());
              }}
            >
              {files.map((file, index) => (
                <SwiperSlide key={index}>
                  {file.type === "image" ? (
                    <img
                      src={file.url}
                      alt="Uploaded"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                      }}
                    />
                  ) : (
                    <video
                      controls
                      src={file.url}
                      poster={file.thumbnail}
                      style={{ width: "100%", height: "auto" }}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
        </Box>
      </Modal>
    </>
  );
};

export default ImageList;
