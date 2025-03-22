import React, { useState, useRef } from "react";
import { Box, IconButton, Modal } from "@mui/material";
import { Delete, Close } from "@mui/icons-material";
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
  const [zoomLevel, setZoomLevel] = useState(300); // Default thumbnail size
  const photosSectionRef = useRef<HTMLDivElement>(null);
  const pinchStartDistance = useRef<number | null>(null);

  // Calculate the distance between two touch points
  const getPinchDistance = (e: React.TouchEvent) => {
    console.log('e.touches: ', e.touches);
    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      console.log('touch1: ', touch1);
      const touch2 = e.touches[1];
      console.log('touch2: ', touch2);
      const dx = touch2.clientX - touch1.clientX;
      const dy = touch2.clientY - touch1.clientY;
      return Math.sqrt(dx * dx + dy * dy);
    }
    return null;
  };

  // Handle touch start to detect pinch gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('Touch Start:', e.touches);
    if (photosSectionRef.current?.contains(e.target as Node)) {
      if (e.touches.length === 2) {
        pinchStartDistance.current = getPinchDistance(e);
      }
      e.preventDefault(); // Prevent native zooming
    }
  };

  // Handle touch move to adjust zoom level
  const handleTouchMove = (e: React.TouchEvent) => {
    if (photosSectionRef.current?.contains(e.target as Node)) {
      if (e.touches.length === 2 && pinchStartDistance.current !== null) {
        const currentDistance = getPinchDistance(e);
        if (currentDistance !== null) {
          const zoomDelta = currentDistance - pinchStartDistance.current;
          setZoomLevel((prevZoomLevel) =>
            Math.max(100, Math.min(500, prevZoomLevel + zoomDelta / 5))
          );
          pinchStartDistance.current = currentDistance; // Update the starting distance
        }
      }
      e.preventDefault(); // Prevent native zooming
    }
  };

  const handleTouchEnd = () => {
    pinchStartDistance.current = null; // Reset pinch distance
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    publicId: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    await deleteImage(publicId, files[index].type);
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
        onClick={(e) => handleDelete(e, index, file.publicId)}
      >
        <Delete />
      </IconButton>
    ) : null,
    isVideo: file.type === "video",
    videoSrc: file.url,
  }));

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={photosSectionRef}
    >
      {/* Photos List Section */}
      <Gallery
        images={images}
        enableImageSelection={false}
        margin={5} // Add margin between items
        rowHeight={zoomLevel} // Dynamically adjust row height based on zoom level
        onClick={(index) => onClickCard(index)}
      />

      {/* Modal Section */}
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
    </div>
  );
};

export default ImageList;
