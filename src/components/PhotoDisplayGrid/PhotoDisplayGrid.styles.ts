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
`;

export const WrapZoomLevel = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "16px",
});

export const StyledZoomOut = styled(ZoomOut)({
  fontSize: 30,
});

export const StyledZoomIn = styled(ZoomIn)({
  fontSize: 30,
});

export const ZoomLevelValue = styled(Box)({
  mx: 1,
  fontSize: "1.4rem",
});

export const DownloadIconButton = styled(IconButton)`
  position: absolute !important;
  top: 5px;
  left: 5px;
  background-color: rgba(255, 255, 255, 0.7) !important;
  pointer-events: auto;
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
  bottom: 72,
  right: "50%",
  transform: show ? "translate(50%, 0)" : "translate(50%, 20px)",
  opacity: show ? 1 : 0,
  transition: "opacity 0.3s ease, transform 0.3s ease",
  pointerEvents: show ? "auto" : "none",
}));

export const CloseButton = styled(IconButton)({
  position: "absolute",
  top: "20px",
  right: "20px",
  zIndex: 9,
  backgroundColor: "rgba(255,255,255,0.7)",
});

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
  height: "98%",
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
