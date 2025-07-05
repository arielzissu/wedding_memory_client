import { ZoomIn, ZoomOut } from "@mui/icons-material";
import { Box, Fab, IconButton } from "@mui/material";
import styled from "styled-components";
import { styled as MuiStyled } from "@mui/material/styles";

export const ImageListWrapper = styled.div`
  .ReactGridGallery_tile-icon-bar {
    display: none !important;
  }
  .ReactGridGallery_custom-overlay {
    opacity: 1 !important;
  }
  img {
    object-fit: cover;
    border-radius: 4px;
  }
`;

export const SwiperWrapper = styled.div`
  .swiper-wrapper {
    display: flex;
    align-items: center;
  }
  .swiper-pagination {
    background-color: rgba(255, 255, 255, 0.8);
    padding: 4px;
    border-radius: 10px;
  }
  .swiper-pagination-bullet {
    background: linear-gradient(to right, #f43f5e, #ec4899) !important;
  }
  .swiper-button-prev {
    color: #f43f5e !important;
  }
  .swiper-button-next {
    color: #f43f5e !important;
  }
  .swiper-button-prev:after {
    background: rgba(255, 255, 255, 0.8) !important;
    padding: 8px !important;
    border-radius: 10px !important;
  }
  .swiper-button-next:after {
    background: rgba(255, 255, 255, 0.8) !important;
    padding: 8px !important;
    border-radius: 10px !important;
  }
`;

export const WrapZoomLevel = styled(Box)`
  position: fixed;
  left: 8px;
  bottom: 90px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 4px;
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const ZoomButton = styled(IconButton)({
  backgroundColor: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "8px",
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  transition: "background-color 0.2s ease, transform 0.1s ease",

  "&:hover": {
    backgroundColor: "#f3f4f6",
  },

  "&:active": {
    transform: "scale(0.95)",
  },
});

export const StyledZoomOut = styled(ZoomOut)({
  fontSize: 24,
  color: "#4b5563",
});

export const StyledZoomIn = styled(ZoomIn)({
  fontSize: 24,
  color: "#4b5563",
});

export const ZoomLevelValue = styled(Box)({
  fontSize: "1rem",
  fontWeight: 500,
  color: "#374151",
});

export const Line = styled.hr`
  width: 100%;
  margin: 0;
`;

export const DownloadIconButton = styled(IconButton)`
  position: absolute !important;
  top: 20px !important;
  left: 20px !important;
  z-index: 10 !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  border-radius: 50% !important;
  width: 48px;
  height: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease, transform 0.1s ease !important;

  &:hover {
    background-color: #ffffff !important;
    transform: scale(1.05);
  }

  svg {
    color: #374151;
  }
`;

export const DeleteIconButton = styled(IconButton)`
  position: absolute !important;
  top: 5px;
  right: 5px;
  background-color: rgba(255, 255, 255, 0.7) !important;
  pointer-events: auto;
`;

export const VideoPlayButton = styled("div")<{ fontSize: string }>(
  ({ fontSize }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(0, 0, 0, 0.5)",
    color: "white",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: fontSize,
  })
);

export const ScrollToTopFab = MuiStyled(Fab, {
  shouldForwardProp: (prop) => prop !== "show",
})<{ show: boolean }>(({ show }) => ({
  width: 45,
  height: 45,
  position: "fixed",
  bottom: 82,
  right: "50%",
  transform: show ? "translate(50%, 0)" : "translate(50%, 20px)",
  opacity: show ? 1 : 0,
  transition: "opacity 0.3s ease, transform 0.3s ease",
  pointerEvents: show ? "auto" : "none",
}));

export const CloseButton = styled(IconButton)`
  position: absolute !important;
  top: 20px !important;
  right: 20px !important;
  z-index: 9 !important;
  background-color: rgba(255, 255, 255, 0.9) !important;
  transition: background-color 0.2s ease, transform 0.1s ease !important;
  width: 48px;
  height: 48px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #ffffff !important;
    transform: scale(1.05);
  }

  svg {
    color: #374151;
  }
`;

export const WrapPhotosCarousel = MuiStyled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[24],
  padding: theme.spacing(2),
  width: "90%",
  maxWidth: "600px",
  borderRadius: "8px",
  overflow: "hidden",
}));

export const CarouselImg = styled("img")`
  width: 100%;
  height: auto;
  border-radius: 10px;
  max-height: 95vh;
  object-fit: cover;
`;

export const CarouselVideo = styled("video")`
  width: 100%;
  height: auto;
  max-height: 95vh;
  object-fit: cover;
`;

export const CarouselControls = styled.div`
  /* position: absolute; */
  /* top: 12px;
  right: 12px; */
  display: flex;
  gap: 8px;
  /* z-index: 2; */
`;
