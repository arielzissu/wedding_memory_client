import styled from 'styled-components';
import { styled as muiStyled } from '@mui/system';
import { IconButton } from '@mui/material';

export const ContainImageUploader = styled.div`
  padding: 0 20px;
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  margin: 16px;
`;

export const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 16px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const PreviewItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  padding: 8px;
`;

export const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
`;

export const PreviewVideo = styled.video`
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
`;

export const DeleteButton = muiStyled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  zIndex: 1
});
