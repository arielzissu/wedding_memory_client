import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { Download, Delete } from "@mui/icons-material";
import {
  deleteDBData,
  deleteWeddingMedia,
  getDownloadedFolderAssets,
} from "api/r2Upload";
import { getUrlSearchParams } from "utils/navigation";
import snackbarStore from "stores/snackbarStore";
import LoaderButton from "components/LoaderButton/LoaderButton";

const AdminPage = () => {
  const [isDownloadedFolderAssets, setIsDownloadedFolderAssets] =
    useState<boolean>(false);
  const [downloadPath, setDownloadPath] = useState<string>();
  const [isLoadingDeleteDB, setIsLoadingDeleteDB] = useState<boolean>(false);
  const [isLoadingDeleteAllMedia, setIsLoadingDeleteAllMedia] =
    useState<boolean>(false);

  const relevantFile = getUrlSearchParams("f");

  const handleDownloadFolderAssets = async () => {
    try {
      setIsDownloadedFolderAssets(true);
      const responseDownloadedFolderAssets = await getDownloadedFolderAssets(
        relevantFile
      );
      setDownloadPath(responseDownloadedFolderAssets?.downloadUrl);
    } finally {
      setIsDownloadedFolderAssets(false);
    }
  };

  const handleDeleteDB = async () => {
    try {
      setIsLoadingDeleteDB(true);
      await deleteDBData();
      snackbarStore.show("MongoDB data deleted successfully", "success");
    } catch (error) {
      snackbarStore.show("Failed to delete MongoDB data", "error");
    } finally {
      setIsLoadingDeleteDB(false);
    }
  };

  const handleDeleteWeddingMedia = async () => {
    try {
      setIsLoadingDeleteAllMedia(true);
      await deleteWeddingMedia(relevantFile);
      snackbarStore.show("Wedding media deleted successfully", "success");
    } catch (error) {
      snackbarStore.show("Failed to delete wedding media", "error");
    } finally {
      setIsLoadingDeleteAllMedia(false);
    }
  };

  const renderDownloadButton = () => {
    return (
      <>
        <LoaderButton
          onClick={handleDownloadFolderAssets}
          isLoading={isDownloadedFolderAssets}
          buttonText="Download All Photos and Videos"
          startIcon={<Download />}
          disabled={isDownloadedFolderAssets}
        />

        <Box mb={1} />

        {downloadPath && (
          <Typography variant="body2">
            Download Path: &quot;{downloadPath}&quot;
          </Typography>
        )}
      </>
    );
  };

  const renderDeleteDBButton = () => {
    return (
      <>
        <LoaderButton
          onClick={handleDeleteDB}
          isLoading={isLoadingDeleteDB}
          buttonText="Delete all MongoDB Data"
          startIcon={<Delete />}
          disabled={isLoadingDeleteDB}
        />
        <Box mb={1} />
        <Typography variant="body2" color="textSecondary">
          Note: This will delete all data in the MongoDB database. Use with
          caution!
        </Typography>
      </>
    );
  };

  const renderDeleteWeddingMediaButton = () => {
    return (
      <>
        <LoaderButton
          onClick={handleDeleteWeddingMedia}
          isLoading={isLoadingDeleteAllMedia}
          buttonText="Delete Wedding Media"
          startIcon={<Delete />}
          disabled={isLoadingDeleteAllMedia}
        />
        <Box mb={1} />
        <Typography variant="body2" color="textSecondary">
          Note: This will delete all wedding photos and videos. Use with
          caution!
        </Typography>
      </>
    );
  };

  return (
    <Box m={5}>
      <Box mb={6} />

      {renderDownloadButton()}

      <Box mb={6} />

      {renderDeleteDBButton()}

      <Box mb={6} />

      {renderDeleteWeddingMediaButton()}
    </Box>
  );
};

export default AdminPage;
