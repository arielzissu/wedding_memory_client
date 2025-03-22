import React, { useState } from "react";
import { ResourceType } from "cloudinary";
import { Box, IconButton, Modal, Slider } from "@mui/material";
import { Delete, Close, ZoomIn, ZoomOut } from "@mui/icons-material";
import { Gallery } from "react-grid-gallery";
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
  isDeletable?: boolean;
}

const ImageList = ({
  selectedIndex,
  files,
  setSelectedIndex,
  setFiles,
  isDeletable = false,
}: ImageListProps) => {
  const [zoomLevel, setZoomLevel] = useState(300); // Default thumbnail width

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    publicId: string,
    resourceType: ResourceType
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    await deleteImage(publicId, resourceType);
  };

  const onClickCard = (index: number) => {
    setSelectedIndex(index);
  };

  const images = files.map((file, index) => ({
    src: file.type === "image" ? `${file.url}?q=100&fm=jpg` : file.thumbnail,
    thumbnail:
      file.type === "image" ? `${file.url}?q=100&fm=jpg` : file.thumbnail,
    thumbnailWidth: zoomLevel, // Dynamically adjust width based on zoom level
    thumbnailHeight: zoomLevel, // Dynamically adjust height based on zoom level
    width: zoomLevel, // Add width property
    height: zoomLevel, // Add height property
    customOverlay: isDeletable ? (
      <IconButton
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          bgcolor: "rgba(255,255,255,0.7)",
        }}
        onClick={(e) => handleDelete(e, index, file.publicId, file.type)}
      >
        <Delete />
      </IconButton>
    ) : null,
    isVideo: file.type === "video",
    videoSrc: file.url,
  }));

  return (
    <>
      {/* Zoom Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <IconButton onClick={() => setZoomLevel((prev) => Math.max(prev - 50, 100))}>
          <ZoomOut />
        </IconButton>
        <Slider
          value={zoomLevel}
          onChange={(e, value) => setZoomLevel(value as number)}
          min={100}
          max={500}
          step={50}
          sx={{ width: "200px", mx: 2 }}
        />
        <IconButton onClick={() => setZoomLevel((prev) => Math.min(prev + 50, 500))}>
          <ZoomIn />
        </IconButton>
      </Box>

      <Gallery
        images={images}
        enableImageSelection={false}
        margin={5} // Add margin between items
        rowHeight={zoomLevel} // Dynamically adjust row height based on zoom level
        onClick={(index) => onClickCard(index)}
      />

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
