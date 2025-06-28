import styled from "styled-components";
import { Tabs, Tab, Typography, Box } from "@mui/material";

export const ContainImageGallery = styled.div``;

export const StyledTitle = styled.div`
  color: #db2777;
  font-weight: 600;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 8px;
`;

export const StyledSubtitle = styled.div`
  color: rgb(75, 85, 99);
  text-align: center;
  margin-bottom: 24px;
`;

export const StyledTabs = styled(Tabs)({
  background: "#fff0f2",
  border: "1px solid #fbcfe8",
  borderRadius: "0.375rem",
  height: "40px",
  minHeight: "unset !important",
  padding: "4px",
  "& .MuiTabs-indicator": {
    zIndex: 0,
    height: "100%",
    borderRadius: "8px",
    backgroundColor: "white",
    transition: "all 0.3s ease",
  },
  "& .MuiTabs-flexContainer": {
    height: "100% !important",
  },
});

export const StyledTab = styled(Tab)(() => ({
  zIndex: 1,
  textTransform: "none",
  fontWeight: 500,
  fontSize: "0.875rem",
  lineHeight: "1.25rem",
  minWidth: 0,
  minHeight: "unset !important",
  flex: 1,
  padding: "0 !important",
  color: "#6b7280",
  paddingTop: "0.375rem",
  paddingBottom: "0.375rem",
  paddingLeft: "0.75rem",
  paddingRight: "0.75rem",
  borderRadius: "0.125rem",
  alignItems: "center",
  justifyContent: "center",
  whiteSpace: "nowrap",

  "&.Mui-selected": {
    background: "#fff",
    color: "#e11d48 !important",
    fontWeight: 700,
    borderRadius: "8px",
  },
  "&.MuiButtonBase-root": {
    height: "100%",
  },
}));

export const StatCard = styled(Box)<{
  bg: string;
  border: string;
  color: string;
}>(({ bg, border, color }) => ({
  flex: 1,
  backgroundColor: bg,
  border: `1px solid ${border} !important`,
  borderRadius: 12,
  padding: "16px",
  textAlign: "center",
  color: color,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
}));

export const StatNumber = styled(Typography)({
  fontSize: "1.125rem !important",
  lineHeight: "1rem !important",
  fontWeight: "700 !important",
  color: "#111827",
});

export const StatLabel = styled(Typography)({
  fontSize: "0.75rem !important",
  lineHeight: "1.75rem !important",
  color: "#374151",
});
