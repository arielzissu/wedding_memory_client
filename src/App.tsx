import React, { SyntheticEvent, useEffect, useRef, useState } from "react";
import UserPhotos from "./components/UserPhotos/UserPhotos";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import AdminPage from "components/AdminPage/AdminPage";
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
} from "@mui/material";
import {
  CloudUpload,
  Image,
  AdminPanelSettings,
  PhotoCamera,
} from "@mui/icons-material";
import Header from "components/Header/Header";
import { ITelegramFile, ILocalUser } from "types";
import { fetchPhotos, uploadPhotos } from "api/cloudinary";
import { SUPPORTED_MEDIA_FORMATS } from "constants/file";
import { getUrlSearchParams } from "utils/navigation";

const MAX_SIZE_IN_BYTES = 0.5 * 1024 * 1024 * 1024; // = 0.5 GB
const MAX_SIZE_IN_GB = MAX_SIZE_IN_BYTES / (1024 * 1024 * 1024);

export const App = () => {
  const [files, setFiles] = useState<ITelegramFile[]>([]);
  const [loggedUserFiles, setLoggedUserFiles] = useState<ITelegramFile[]>([]);
  const [value, setValue] = useState<number>(0);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [user, setUser] = useState<ILocalUser>();
  const [userEmail, setUserEmail] = useState<string>();
  const [isLoadingUpload, setIsLoadingUpload] = useState<boolean>(false);
  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);
  const [isFiveSecondsPassed, setIsFiveSecondsPassed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const relevantFile = getUrlSearchParams("f");

  const getUserEmail = () => {
    const localStorageEmail = getFromLocalStorage(USER_DATA_KEY);
    if (localStorageEmail) {
      setUserEmail(localStorageEmail.email);
    }
  };

  const fetchImages = async () => {
    const photosResponse = await fetchPhotos(relevantFile);
    setFiles((prevFiles) => [...prevFiles, ...photosResponse]);
  };

  useEffect(() => {
    getUserEmail();
    fetchImages();
  }, []);

  useEffect(() => {
    if (!userEmail) return;
    const userFiles = files.filter((file) => file.uploadCreator === userEmail);
    setLoggedUserFiles(userFiles);
  }, [files, userEmail]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFiveSecondsPassed(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (_e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
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

  const handleFileChange = async (event) => {
    event.preventDefault();
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

      const uploadedFile = await uploadPhotos(
        formData,
        relevantFile,
        userEmail
      );

      setFiles((prevFiles) => [...prevFiles, ...uploadedFile]);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setIsLoadingUpload(false);
    }
  };

  useEffect(() => {
    const localUser = getFromLocalStorage(USER_DATA_KEY);
    setUser(localUser);
    const isAdmin = localUser && localUser.email === "arielzissu98@gmail.com";
    setIsAdminUser(isAdmin);
  }, []);

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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Header user={user} onSignOut={handleSignOut} onSignIn={handleSignIn} />

      <Box sx={{ flex: 1, overflow: "auto", p: 2, pb: 7 }}>
        {value === 0 && (
          <UserPhotos
            loggedUserFiles={loggedUserFiles}
            setLoggedUserFiles={setLoggedUserFiles}
          />
        )}
        {value === 1 && <ImageGallery files={files} setFiles={setFiles} />}
        {value === 2 && isAdminUser && <AdminPage />}
      </Box>

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
        value={value}
        onChange={handleChange}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          bgcolor: "background.paper",
          boxShadow: "0 -2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <BottomNavigationAction
          label="My Photos"
          showLabel
          icon={<PhotoCamera />}
          sx={{ color: value === 0 ? "primary.main" : "text.secondary" }}
        />
        <BottomNavigationAction
          label="Gallery"
          showLabel
          icon={<Image />}
          sx={{ color: value === 1 ? "primary.main" : "text.secondary" }}
        />
        {isAdminUser && (
          <BottomNavigationAction
            label="Admin"
            showLabel
            icon={<AdminPanelSettings />}
            sx={{ color: value === 2 ? "primary.main" : "text.secondary" }}
          />
        )}
      </BottomNavigation>

      {isOpenLoginModal && (
        <LoginModal
          isOpen={isOpenLoginModal}
          onClose={() => setIsOpenLoginModal(false)}
        />
      )}
    </Box>
  );
};
