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
  height: "44px",
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

export const CountsGrid = styled(Box)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 12px;
  margin-bottom: 8px;
`;

export const StatCard = styled(Box)<{
  gradient: "rose" | "purple" | "amber";
  color?: string;
}>(({ gradient, color }) => ({
  borderRadius: "12px",
  padding: "12px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  color: color || "#1f2937",
  background: `linear-gradient(to bottom right, ${
    gradient === "rose"
      ? "rgba(255, 241, 242, 0.6), rgba(255, 228, 230, 0.3)"
      : gradient === "purple"
      ? "rgba(243, 232, 255, 0.6), rgba(252, 231, 243, 0.3)"
      : "rgba(255, 251, 235, 0.6), rgba(255, 247, 237, 0.3)"
  })`,
}));

export const StatText = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
`;

export const StatNumber = styled(Typography)`
  font-size: 1.125rem;
  font-weight: bold;
  color: #1f2937;
`;

export const StatLabel = styled(Typography)`
  font-size: 0.75rem;
  color: #4b5563;
`;

export const IconStyle = styled.div`
  .icon {
    width: 20px;
    height: 20px;
  }
  .icon.rose {
    color: #f43f5e;
  }
  .icon.purple {
    color: #a855f7;
  }
  .icon.amber {
    color: #f59e0b;
  }
`;

export const ContainCountsText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 4px;
`;
