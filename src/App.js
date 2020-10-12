import React, { Fragment, useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import AboutModal from "./components/AboutModal/AboutModal";
import MainContent from "./containers/MainContent/MainContent";

const App = () => {
  const [showAboutModal, setShowAboutModal] = useState(true);

  return (
    <Fragment>
      <TopBar />
      <MainContent />
      <AboutModal
        show={showAboutModal}
        onHide={() => setShowAboutModal(false)}
      />
    </Fragment>
  );
};

export default App;
