import React, { SyntheticEvent, useEffect, useState } from "react";
import ImageUploaderModal from "./components/ImageUploader/ImageUploader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ContainTabs } from "./app.styles";
import AdminPage from "components/AdminPage/AdminPage";
import { getFromLocalStorage } from "utils/localStorage";
import { USER_EMAIL_KEY } from "components/Login/Login";
import { Box } from "@mui/material";
import Header from "components/Header/Header";
import { ILocalUser } from "types";

export const App = () => {
  const [value, setValue] = useState<number>(0);
  const [isAdminUser, setIsAdminUser] = useState<boolean>(false);
  const [user, setUser] = useState<ILocalUser>();

  const handleChange = (_e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const localUser = getFromLocalStorage(USER_EMAIL_KEY);
    setUser(localUser);
    const isAdmin = localUser && localUser.email === "arielzissu98@gmail.com";
    setIsAdminUser(isAdmin);
  }, []);

  return (
    <Box sx={{ margin: "auto", textAlign: "center", p: 3 }}>
      <Header user={user} />

      <ContainTabs>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Upload Images" />
          <Tab label="Images List" />
          {isAdminUser && <Tab label="Admin Page" />}
        </Tabs>
      </ContainTabs>

      <div>
        {value === 0 && <ImageUploaderModal />}
        {value === 1 && <ImageGallery />}
        {value === 2 && isAdminUser && <AdminPage />}
      </div>
    </Box>
  );
};
