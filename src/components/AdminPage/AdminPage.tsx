import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Download } from "@mui/icons-material";
import { getDownloadedFolderAssets } from "api/r2Upload";
import { getUrlSearchParams } from "utils/navigation";

const AdminPage = () => {
  const [isDownloadedFolderAssets, setIsDownloadedFolderAssets] =
    useState<boolean>(false);
  const [downloadPath, setDownloadPath] = useState<string>();

  const relevantFile = getUrlSearchParams("f");

  const handleDownloadFolderAssets = async () => {
    setIsDownloadedFolderAssets(true);
    const responseDownloadedFolderAssets = await getDownloadedFolderAssets(
      relevantFile
    );
    setDownloadPath(responseDownloadedFolderAssets?.downloadPath);
    setIsDownloadedFolderAssets(false);
  };

  return (
    <Box m={5}>
      <Button
        startIcon={<Download />}
        variant="contained"
        component="label"
        onClick={handleDownloadFolderAssets}
        disabled={isDownloadedFolderAssets}
      >
        {isDownloadedFolderAssets ? (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress />
          </Box>
        ) : (
          "Download all photos and videos"
        )}
      </Button>

      {downloadPath && (
        <Typography variant="h6">
          Download Path: &quot;{downloadPath}&quot;
        </Typography>
      )}
    </Box>
  );
};

export default AdminPage;
