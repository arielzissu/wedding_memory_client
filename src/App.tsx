import React, { SyntheticEvent, useState } from "react";
import ImageUploaderModal from "./components/ImageUploader/ImageUploader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { AppContainer, ContainTabs } from "./app.styles";

export const App = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_e: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppContainer>
      <ContainTabs>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Upload Images" />
          <Tab label="Images List" />
        </Tabs>
      </ContainTabs>

      <div>
        {value === 0 && <ImageUploaderModal />}
        {value === 1 && <ImageGallery />}
      </div>
    </AppContainer>
  );
};
