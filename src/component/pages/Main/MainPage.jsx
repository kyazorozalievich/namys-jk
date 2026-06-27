import React from "react";
import Main from "./Main";
import Stats from "./Stats";
import LiderMain from "./LiderMain";
import Gallery from "../About/GalleryAbout";
import History from "./History";
import Uslugi from "./Uslugi";

const MainPage = () => {
  return (
    <div>
      <Main />
      <Stats />
      <LiderMain />
      <Uslugi />
      <History />
    </div>
  );
};

export default MainPage;
