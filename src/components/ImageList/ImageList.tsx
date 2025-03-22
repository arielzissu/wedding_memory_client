import React, { useState, useEffect } from "react";
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
  const [rowHeight, setRowHeight] = useState(300); // Default thumbnail size

  // Listen for zoom changes on mobile and adjust only the photos list
  useEffect(() => {
    const handleZoomChange = () => {
      const scale = window.visualViewport?.scale || 1; // Default scale is 1
      const newRowHeight = Math.max(100, Math.min(500, 300 / scale)); // Adjust row height based on scale
      setRowHeight(newRowHeight);
    };

    window.visualViewport?.addEventListener("resize", handleZoomChange);
    return () => {
      window.visualViewport?.removeEventListener("resize", handleZoomChange);
    };
  }, []);

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
    thumbnailWidth: rowHeight, // Dynamically adjust width based on row height
    thumbnailHeight: rowHeight, // Dynamically adjust height based on row height
    width: rowHeight, // Add width property
    height: rowHeight, // Add height property
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
    <>
      {/* Photos List Section */}
      <Gallery
        images={images}
        enableImageSelection={false}
        margin={5} // Add margin between items
        rowHeight={rowHeight} // Dynamically adjust row height based on zoom level
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
    </>
  );
};

export default ImageList;
