import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, Modal, Fab } from "@mui/material";
import {
  Delete,
  Close,
  ZoomIn,
  ZoomOut,
  ArrowUpward,
} from "@mui/icons-material";
import { Gallery } from "react-grid-gallery";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ImageListWrapper, SwiperWrapper } from "./PhotoDisplayGrid.styles";
import { IR2File } from "types";
import { deletePhoto } from "api/telegramStorage";
import { getFromLocalStorage } from "utils/localStorage";
import { USER_DATA_KEY } from "components/Login/Login";

const SHOW_SCROLL_BUTTON_FROM_Y_PIXEL = 330;

interface IPhotoDisplayGridProps {
  selectedIndex: number | null;
  files: IR2File[];
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setFiles: React.Dispatch<React.SetStateAction<IR2File[]>>;
  isDeletable?: boolean;
}

const PhotoDisplayGrid = ({
  selectedIndex,
  files,
  setSelectedIndex,
  setFiles,
  isDeletable = false,
}: IPhotoDisplayGridProps) => {
  const [zoomLevel, setZoomLevel] = useState(150);
  const [columns, setColumns] = useState(3);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  console.log('[PhotoDisplayGrid] - files!!!!!!!: ', files);

  useEffect(() => {
    const updateColumns = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newColumns = Math.max(1, Math.floor(containerWidth / zoomLevel));
        setColumns(newColumns);
      }
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => {
      window.removeEventListener("resize", updateColumns);
    };
  }, [zoomLevel]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > SHOW_SCROLL_BUTTON_FROM_Y_PIXEL) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    const userData = getFromLocalStorage(USER_DATA_KEY);
    await deletePhoto(userData.email, fileName);
  };

  const onClickCard = (index: number) => {
    setSelectedIndex(index);
  };

  const scrollToFirstImage = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const photos = files.map((file, index) => {
    return {
      src: file.type === "photo" ? file.url : file.metadata.thumbnail_url,
      thumbnail: file.type === "photo" ? file.url : file.metadata.thumbnail_url,
      thumbnailWidth: zoomLevel,
      thumbnailHeight: zoomLevel,
      width: zoomLevel,
      height: zoomLevel,
      customOverlay: (
        <>
          {isDeletable && (
            <IconButton
              sx={{
                position: "absolute",
                top: 5,
                right: 5,
                bgcolor: "rgba(255,255,255,0.7)",
                pointerEvents: "auto",
              }}
              onClick={(e) => handleDelete(e, index, file.fileName)}
            >
              <Delete />
            </IconButton>
          )}
          {file.type === "video" && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "14px",
              }}
            >
              ▶
            </div>
          )}
        </>
      ),
      isVideo: file.type === "video",
      videoSrc: file.url,
    };
  });

  return (
    <ImageListWrapper ref={containerRef}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <IconButton
          onClick={() => setZoomLevel((prev) => Math.max(prev - 50, 100))}
        >
          <ZoomOut sx={{ fontSize: 30 }} />
        </IconButton>
        <Box sx={{ mx: 1, fontSize: "1.4rem" }}>{zoomLevel}px</Box>
        <IconButton
          onClick={() => setZoomLevel((prev) => Math.min(prev + 50, 400))}
        >
          <ZoomIn sx={{ fontSize: 30 }} />
        </IconButton>
      </Box>

      <Gallery
        images={photos}
        enableImageSelection={false}
        margin={5}
        rowHeight={zoomLevel}
        onClick={(index) => onClickCard(index)}
      />

      <Fab
        color="default"
        aria-label="scroll-to-top"
        sx={{
          width: 45,
          height: 45,
          position: "fixed",
          bottom: 72,
          right: "50%",
          transform: showScrollButton
            ? "translate(50%, 0)"
            : "translate(50%, 20px)",
          opacity: showScrollButton ? 1 : 0,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: showScrollButton ? "auto" : "none",
        }}
        onClick={scrollToFirstImage}
      >
        <ArrowUpward />
      </Fab>

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
            height: "98%",
            borderRadius: 8,
            overflow: "hidden",
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
                  {file.type === "photo" ? (
                    <img
                      key={`photo-${file.fileName}-${index}`}
                      src={file.url}
                      alt="Photo"
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "10px",
                        maxHeight: "95vh",
                      }}
                    />
                  ) : (
                    <video
                      key={`video-${file.fileName}-${index}`}
                      controls
                      src={file.url}
                      poster={file.metadata.thumbnail_url}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "95vh",
                      }}
                    />
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
        </Box>
      </Modal>
    </ImageListWrapper>
  );
};

export default PhotoDisplayGrid;


