import { Button } from "@mui/material";
import styled from "styled-components";

export const UploaderArea = styled.div<{ overrideBgColor?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 2rem;
  background-color: ${({ overrideBgColor }) => overrideBgColor || "unset"};
  border: 2px rgb(254, 205, 211) dashed;
  border-radius: 0.5rem;
`;

export const WrapCameraIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #fce6f1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

export const UploaderAreaTitle = styled.div`
  font-weight: 600;
  color: rgb(31, 41, 55);
  font-size: 1.125rem;
  line-height: 1.75rem;
  text-align: center;
  margin-bottom: 8px;
`;

export const UploaderAreaSubtitle = styled.div`
  color: rgb(75, 85, 99);
  text-align: center;
  margin-bottom: 16px;
`;

export const UploaderAreaSubtitle2 = styled.div`
  color: rgb(75, 85, 99);
  text-align: center;
  margin-bottom: 16px;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

export const UploaderAreaNote = styled.div`
  color: rgb(107, 114, 128);
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
`;

export const GradientButton = styled(Button)`
  width: 100%;
  margin-bottom: 16px !important;
  text-transform: capitalize !important;
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  color: white !important;
  background: linear-gradient(to right, #f43f5e, #ec4899);
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);

  svg {
    width: 18px;
    height: 18px;
  }
`;

export const StyledTitle = styled.div`
  color: #db2777;
  font-weight: 600;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 8px;
`;

export const CounterText = styled.div`
  color: rgb(75, 85, 99);
  text-align: center;
  margin-bottom: 24px;
`;
