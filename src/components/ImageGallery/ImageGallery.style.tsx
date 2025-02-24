import styled from 'styled-components';

export const ContainImageGallery = styled.div`
  padding: 0 20px;
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const ContainAssetsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const StyledImg = styled.img`
  max-width: 100%;
  max-height: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const StyledVideo = styled.video`
  max-width: 100%;
  max-height: 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
