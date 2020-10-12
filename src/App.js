import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import TopBar from "./components/TopBar/TopBar";
import AboutModal from "./components/AboutModal/AboutModal";
import MainContent from "./containers/MainContent/MainContent";
import Home from "./containers/Home/Home";

const App = () => {
  const [showAboutModal, setShowAboutModal] = useState(true);

  return (
    <Switch>
      <Route path="/bot">
        <TopBar />
        <MainContent />
        <AboutModal
          show={showAboutModal}
          onHide={() => setShowAboutModal(false)}
        />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default App;
