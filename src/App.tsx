import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import {
  getFromLocalStorage,
  removeFromLocalStorage,
} from "utils/localStorage";
import LoginModal, { USER_DATA_KEY } from "components/Login/Login";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
  CircularProgress,
  Button,
} from "@mui/material";
import {
  CloudUpload,
  Image,
  AdminPanelSettings,
  PhotoCamera,
  People as PeopleIcon,
} from "@mui/icons-material";
import Header from "components/Header/Header";
import { ILocalUser, IR2File, TabsOptions } from "types";
import { fetchPhotos, getUploadStatus, uploadPhotos } from "api/r2Upload";
import { SUPPORTED_MEDIA_FORMATS } from "constants/file";
import { getUrlSearchParams } from "utils/navigation";
import GlobalSnackbar from "components/GlobalSnackbar/GlobalSnackbar";
import PeopleGallery from "components/PeopleGallery/PeopleGallery";
import UserPhotos from "components/UserPhotos/UserPhotos";
import snackbarStore from "stores/snackbarStore";
import { getPollUploadsStatusIntervalTime } from "utils/file";
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PATH_TO_TAB, TAB_TO_PATH } from "constants/app";
import GenericModal from "components/Modal/Modal";

const MAX_SIZE_IN_BYTES = 3 * 1024 * 1024 * 1024; // = 0.5 GB
const MAX_SIZE_IN_GB = MAX_SIZE_IN_BYTES / (1024 * 1024 * 1024);

export const App = () => {
  const [files, setFiles] = useState<IR2File[]>([]);
  const [loggedUserFiles, setLoggedUserFiles] = useState<IR2File[]>([]);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [user, setUser] = useState<ILocalUser>();
  const [userEmail, setUserEmail] = useState<string>();
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isOpenUploadModal, setIsOpenUploadModal] = useState<boolean>(false);
  const [isFiveSecondsPassed, setIsFiveSecondsPassed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const relevantFile: string = getUrlSearchParams("f");

  const navigate = useNavigate();
  const location = useLocation();

  const initialTab = Object.values(TabsOptions).includes(
    PATH_TO_TAB[location.pathname] as TabsOptions
  )
    ? (PATH_TO_TAB[location.pathname] as TabsOptions)
    : TabsOptions.GALLERY;

  const [currentTab, setCurrentTab] = useState<TabsOptions>(initialTab);

  const getUserEmail = () => {
    const storedUser = getFromLocalStorage(USER_DATA_KEY);
    setUser(storedUser);
    if (storedUser?.email) {
      setUserEmail(storedUser.email);
      setIsAdminUser(storedUser.email === "arielzissu98@gmail.com");
    }
  };

  const fetchImages = async () => {
    const fetchResponse = await fetchPhotos(relevantFile);
    const photosResponse = fetchResponse.photos;
    if (photosResponse?.length > 0) {
      setFiles(photosResponse);
    }
  };

  useEffect(() => {
    getUserEmail();
    fetchImages();
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    setLoggedUserFiles(files.filter((f) => f.metadata.uploader === userEmail));
  }, [files, userEmail]);

  useEffect(() => {
    const timer = setTimeout(() => setIsFiveSecondsPassed(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (_e: SyntheticEvent, newValue: TabsOptions) => {
    setCurrentTab(newValue);
    const search = location.search;
    navigate(`${TAB_TO_PATH[newValue]}${search}`);
  };

  const onClickFileInput = () => {
    if (!userEmail) {
      setIsOpenLoginModal(true);
      return;
    }
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const pollUploadStatus = (uploadId: string, totalSize: number) => {
    const intervalTime = getPollUploadsStatusIntervalTime(totalSize);

    const interval = setInterval(async () => {
      const res = await getUploadStatus(uploadId);
      if (res?.status === "completed") {
        clearInterval(interval);
        clearTimeout(timeout);
        snackbarStore.show("Upload complete!", "success");
        fetchImages();
      }
      if (res?.status === "failed") {
        clearInterval(interval);
        clearTimeout(timeout);
        snackbarStore.show("Upload failed", "error");
      }
    }, intervalTime);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 120000);
  };

  const handleFileChange = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!userEmail) {
      setIsOpenLoginModal(true);
      return;
    }

    const inputFiles = event.target.files;
    const selectedFiles: File[] = Array.from(inputFiles);

    const totalSize = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_SIZE_IN_BYTES) {
      console.warn(`The total file size exceeds ${MAX_SIZE_IN_GB} GB.`);
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      setIsLoadingUpload(true);

      snackbarStore.show("Preparing your photos for upload...", "info", null);

      const uploadedFileResponse = await uploadPhotos(
        formData,
        relevantFile,
        userEmail
      );

      snackbarStore.show(
        "Uploading your photos... They'll appear here once ready",
        "info",
        null
      );
      pollUploadStatus(uploadedFileResponse.uploadId, totalSize);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsLoadingUpload(false);
    }
  };

  const handleSignOut = () => {
    removeFromLocalStorage(USER_DATA_KEY);
    setUser(undefined);
    setFiles([]);
    setLoggedUserFiles([]);
    setUserEmail(undefined);
  };

  const handleSignIn = () => {
    setIsOpenLoginModal(true);
  };

  const shouldShowUploadButton = !userEmail && isFiveSecondsPassed;

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Header user={user} onSignOut={handleSignOut} onSignIn={handleSignIn} />

        <Fab
          color="primary"
          aria-label="upload"
          sx={{
            position: "fixed",
            bottom: 80,
            right: 16,
            animation: shouldShowUploadButton ? "pulse 1.5s infinite" : "none",
            "@keyframes pulse": {
              "0%": {
                transform: "scale(1)",
                boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.2)",
              },
              "50%": {
                transform: "scale(1.15)",
                boxShadow: "0 0 15px 5px rgba(0, 0, 0, 0.4)",
              },
              "100%": {
                transform: "scale(1)",
                boxShadow: "0 0 0 0 rgba(0, 0, 0, 0.2)",
              },
            },
          }}
          onClick={onClickFileInput}
          disabled={isLoadingUpload}
        >
          {isLoadingUpload ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            <CloudUpload />
          )}
        </Fab>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={SUPPORTED_MEDIA_FORMATS.join()}
          hidden
          onChange={handleFileChange}
        />

        <BottomNavigation
          value={currentTab}
          onChange={handleChange}
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: `calc(64px + env(safe-area-inset-bottom))`,
            paddingBottom: "env(safe-area-inset-bottom)",
            bgcolor: "background.paper",
            boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <BottomNavigationAction
            value={TabsOptions.MY_PHOTO}
            label="My Photos"
            showLabel
            icon={<PhotoCamera />}
            sx={{
              color:
                currentTab === TabsOptions.MY_PHOTO
                  ? "primary.main"
                  : "text.secondary",
            }}
          />
          <BottomNavigationAction
            value={TabsOptions.GALLERY}
            label="Gallery"
            showLabel
            icon={<Image />}
            sx={{
              color:
                currentTab === TabsOptions.GALLERY
                  ? "primary.main"
                  : "text.secondary",
            }}
          />
          <BottomNavigationAction
            value={TabsOptions.PEOPLE}
            label="People"
            showLabel
            icon={<PeopleIcon />}
            sx={{
              color:
                currentTab === TabsOptions.PEOPLE
                  ? "primary.main"
                  : "text.secondary",
            }}
          />
          {isAdminUser && (
            <BottomNavigationAction
              value={TabsOptions.ADMIN}
              label="Admin"
              showLabel
              icon={<AdminPanelSettings />}
              sx={{
                color:
                  currentTab === TabsOptions.ADMIN
                    ? "primary.main"
                    : "text.secondary",
              }}
            />
          )}
        </BottomNavigation>

        <Box sx={{ flex: 1, overflow: "auto", p: 2, pb: 7, mb: 8 }}>
          <Routes>
            <Route
              path={TAB_TO_PATH.my_photo}
              element={
                <UserPhotos
                  loggedUserFiles={loggedUserFiles}
                  setLoggedUserFiles={setLoggedUserFiles}
                />
              }
            />
            <Route
              path={TAB_TO_PATH.gallery}
              element={<ImageGallery files={files} setFiles={setFiles} />}
            />
            <Route
              path={TAB_TO_PATH.people}
              element={
                <PeopleGallery
                  userEmail={userEmail}
                  relevantFile={relevantFile}
                  files={files}
                />
              }
            />
            {/* {isAdminUser && <Route path={TAB_TO_PATH.admin} element={<AdminPage />} />}  */}

            <Route
              path="*"
              element={
                <Navigate
                  to={TAB_TO_PATH.gallery + "/" + location.search}
                  replace
                />
              }
            />
          </Routes>
        </Box>
      </Box>
      <GlobalSnackbar />
      {isOpenLoginModal && (
        <LoginModal
          isOpen={isOpenLoginModal}
          onClose={() => {
            setIsOpenLoginModal(false);
            getUserEmail();
            setIsOpenUploadModal(true);
          }}
        />
      )}

      <GenericModal
        open={isOpenUploadModal}
        onClose={() => setIsOpenUploadModal(false)}
        title="upload photos"
        description={`You can upload photos up to ${MAX_SIZE_IN_GB} GB. Please select the files you want to upload.`}
        actions={
          <>
            <Button
              sx={{ minWidth: 162 }}
              onClick={() => {
                onClickFileInput();
                setIsOpenUploadModal(false);
              }}
              variant="contained"
            >
              Upload Photos
            </Button>
          </>
        }
      ></GenericModal>
    </>
  );
};
