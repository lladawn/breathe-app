// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.js";
import { BreatheLandingPage } from "./pages/LandingPage";
// import LottieAnimation from "./components/LottieAnimation.js";
import Reflect from "./pages/Reflect.js";
import ArchivePage from "./pages/Archive.js";
import ConnectPage from "./pages/ConnectComingSoon.js";
import SaveNotePage from "./pages/SaveNote.js";
// import fallingLeaves from "./assets/animations/falling-leaves.json";

export default function App() {
  return (
    <Router>
      <MainLayout>
        {/* <LottieAnimation animation={fallingLeaves} /> */}

        <Routes>
          <Route path="/" element={<BreatheLandingPage />} />
          <Route path="/reflect" element={<Reflect />} />
          <Route path="/savenote" element={<SaveNotePage />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/connect" element={<ConnectPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}
