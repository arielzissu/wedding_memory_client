import styled from "styled-components";

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
