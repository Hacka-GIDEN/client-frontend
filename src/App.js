import React, { Fragment } from "react";
import TopBar from "./components/TopBar/TopBar";
import MainContent from "./containers/MainContent/MainContent";

const App = () => {
  return (
    <Fragment>
      <TopBar />
      <MainContent />
    </Fragment>
  );
};

export default App;
