import styled from "styled-components";

export const PeopleFaceImg = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 20%;
`;

export const FaceGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
`;

export const FaceCard = styled.div`
  cursor: pointer;
  text-align: center;
`;
