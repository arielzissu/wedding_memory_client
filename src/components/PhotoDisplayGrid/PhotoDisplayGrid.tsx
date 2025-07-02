import React, { useState, useEffect, useRef, useMemo } from "react";
import { Box, Modal } from "@mui/material";
import { Delete, Close, ArrowUpward, Download } from "@mui/icons-material";
import { Gallery } from "react-grid-gallery";
import InfiniteScroll from "react-infinite-scroll-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  CarouselImg,
  CarouselVideo,
  CloseButton,
  DeleteIconButton,
  DownloadIconButton,
  ImageListWrapper,
  ScrollToTopFab,
  StyledZoomIn,
  StyledZoomOut,
  SwiperWrapper,
  VideoPlayButton,
  WrapPhotosCarousel,
  WrapZoomLevel,
  ZoomButton,
  Line,
} from "./PhotoDisplayGrid.styles";
import { IR2File } from "types";
import { deletePhoto } from "api/r2Upload";
import { getFromLocalStorage } from "utils/localStorage";
import { USER_DATA_KEY } from "components/Login/Login";
import GenericModal from "components/Modal/Modal";
import { isIOS } from "constants/app";
import snackbarStore from "stores/snackbarStore";

const SHOW_SCROLL_BUTTON_FROM_Y_PIXEL = 330;
const BATCH_SIZE = 15;

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
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
  const [displayedCount, setDisplayedCount] = useState<number>(BATCH_SIZE);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isOpenDownloadModal, setIsOpenDownloadModal] =
    useState<boolean>(false);
  const [downloadPhotoUrl, setDownloadPhotoUrl] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    index: number;
    fileName: string;
    isPhoto: boolean;
  } | null>(null);

  const [hasMore, setHasMore] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > SHOW_SCROLL_BUTTON_FROM_Y_PIXEL) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const currentBatch = files.slice(
      displayedCount - BATCH_SIZE,
      displayedCount
    );
    const imagePromises = currentBatch
      .filter((f) => f.type === "photo")
      .map((file) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = file.url;
          img.onload = resolve;
          img.onerror = resolve;
        });
      });

    Promise.all(imagePromises).then(() => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const userHasNotScrolled = window.scrollY === 0;

      if (pageHeight <= viewportHeight || userHasNotScrolled) {
        loadMore();
      }
    });
  }, [displayedCount, files]);

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number,
    fileName: string,
    isPhoto: boolean
  ) => {
    e.stopPropagation();
    setDeleteTarget({ index, fileName, isPhoto });
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setFiles((prevFiles) =>
      prevFiles.filter((_, i) => i !== deleteTarget.index)
    );
    const userData = getFromLocalStorage(USER_DATA_KEY);
    setIsLoadingDelete(true);
    await deletePhoto(userData.email, deleteTarget.fileName);
    setIsLoadingDelete(false);
    setDeleteTarget(null);
  };

  const onClickCard = (index: number) => {
    setSelectedIndex(index);
  };

  const scrollToFirstImage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const playButtonSize = (): string => {
    switch (zoomLevel) {
      case 100:
      case 150:
        return "14px";
      case 200:
      case 250:
        return "16px";
      case 300:
        return "18px";
      case 350:
        return "20px";
      case 400:
        return "22px";
      default:
        return "14px";
    }
  };

  const downloadMedia = async (mediaUrl, fileName) => {
    if (isIOS) {
      setIsOpenDownloadModal(true);
      setDownloadPhotoUrl(mediaUrl);
    } else {
      try {
        const response = await fetch(mediaUrl, { mode: "cors" });
        if (!response.ok) throw new Error("File fetch failed");
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Download failed:", error);
        snackbarStore.show("Download failed", "error");
      }
    }
  };

  const renderDownloadButton = (file) => {
    return (
      <DownloadIconButton
        onClick={() => downloadMedia(file.url, file.fileName)}
      >
        <Download />
      </DownloadIconButton>
    );
  };

  const loadMore = () => {
    if (displayedCount >= files.length) {
      setHasMore(false);
      return;
    }
    setDisplayedCount((prev) => Math.min(prev + BATCH_SIZE, files.length));
  };

  const displayedFiles = useMemo(
    () => files.slice(0, displayedCount),
    [files, displayedCount]
  );

  const photos = displayedFiles.map((file, index) => {
    const isPhoto = file.type === "photo";
    return {
      src: isPhoto ? file.url : file.metadata.thumbnail_url,
      thumbnail: isPhoto ? file.url : file.metadata.thumbnail_url,
      thumbnailWidth: zoomLevel,
      thumbnailHeight: zoomLevel,
      width: zoomLevel,
      height: zoomLevel,
      customOverlay: (
        <>
          {isDeletable && (
            <DeleteIconButton
              onClick={(e) => handleDelete(e, index, file.fileName, isPhoto)}
            >
              <Delete />
            </DeleteIconButton>
          )}
          {file.type === "video" && (
            <VideoPlayButton id="play-button" fontSize={playButtonSize()}>
              ▶
            </VideoPlayButton>
          )}
        </>
      ),
      isVideo: file.type === "video",
      videoSrc: file.url,
    };
  });

  const closeDownloadModal = () => {
    setIsOpenDownloadModal(false);
    setDownloadPhotoUrl(null);
  };

  const renderZoomButtons = () => {
    if (displayedFiles.length === 0) return null;
    return (
      <WrapZoomLevel>
        <ZoomButton
          onClick={() => setZoomLevel((prev) => Math.min(prev + 50, 400))}
        >
          <StyledZoomIn />
        </ZoomButton>
        <Line />
        <ZoomButton
          onClick={() => setZoomLevel((prev) => Math.max(prev - 50, 100))}
        >
          <StyledZoomOut />
        </ZoomButton>
      </WrapZoomLevel>
    );
  };

  return (
    <ImageListWrapper ref={containerRef}>
      {renderZoomButtons()}

      <InfiniteScroll
        dataLength={displayedFiles.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading more photos...</h4>}
        style={{ overflow: "visible" }}
      >
        <Gallery
          images={photos}
          enableImageSelection={false}
          margin={5}
          rowHeight={zoomLevel}
          onClick={(index) => onClickCard(index)}
        />
      </InfiniteScroll>

      <ScrollToTopFab
        color="default"
        aria-label="scroll-to-top"
        onClick={scrollToFirstImage}
        show={showScrollButton}
      >
        <ArrowUpward />
      </ScrollToTopFab>

      <Modal
        open={selectedIndex !== null}
        onClose={() => setSelectedIndex(null)}
      >
        <WrapPhotosCarousel>
          <CloseButton onClick={() => setSelectedIndex(null)}>
            <Close />
          </CloseButton>

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
                  <Box sx={{ position: "relative" }}>
                    {file.type === "photo" ? (
                      <CarouselImg
                        key={`photo-${file.fileName}-${index}`}
                        src={file.url}
                        alt="Photo"
                        loading="lazy"
                      />
                    ) : (
                      <CarouselVideo
                        key={`video-${file.fileName}-${index}`}
                        controls
                        src={file.url}
                        poster={file.metadata.thumbnail_url}
                      />
                    )}
                  </Box>
                  {renderDownloadButton(file)}
                </SwiperSlide>
              ))}
            </Swiper>
          </SwiperWrapper>
        </WrapPhotosCarousel>
      </Modal>

      <GenericModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Are you sure?"
        description={`Do you want to delete the ${
          deleteTarget?.isPhoto ? "photo" : "video"
        }`}
        cancelButtonText="Cancel"
        onClickCancelButton={() => setDeleteTarget(null)}
        confirmButtonText="Delete Confirm"
        onClickConfirmButton={confirmDelete}
        isLoadingConfirm={isLoadingDelete}
      ></GenericModal>

      <GenericModal
        open={isOpenDownloadModal}
        onClose={closeDownloadModal}
        title="Download Photo"
        description="A new tab will open - tap and hold the photo to save it to your device"
        cancelButtonText="Cancel"
        onClickCancelButton={closeDownloadModal}
        confirmButtonText="Download"
        onClickConfirmButton={() => {
          closeDownloadModal();
          if (downloadPhotoUrl) {
            window.open(downloadPhotoUrl, "_blank", "noopener,noreferrer");
          }
        }}
      ></GenericModal>
    </ImageListWrapper>
  );
};

export default React.memo(PhotoDisplayGrid);
