// App.js
import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.js";
// import { BreatheLandingPage } from "./pages/OldLandingPage.js";
// import LottieAnimation from "./components/LottieAnimation.js";
import Reflect from "./pages/Reflect";
import ArchivePage from "./pages/Archive.js";
import ConnectSoonPage from "./pages/ConnectComingSoon.js";
import SaveNotePage from "./pages/SaveNote.js";
import HeartPage from "./pages/HeartPage.js";
import Storybook from "./pages/Storybook";
import HomePage from "./pages/Home";
import ConnectPage from "./pages/Connect";
import { v4 as uuidv4 } from "uuid";
import AddToHomePrompt from "./components/AddToHomePrompt";

// import fallingLeaves from "./assets/animations/falling-leaves.json";

export default function App() {
  useEffect(() => {
    let userId = localStorage.getItem("breatheUserId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("breatheUserId", userId);
    }
  }, []);

  return (
    <Router>
      <MainLayout>
        {/* <LottieAnimation animation={fallingLeaves} /> */}

        <AddToHomePrompt />

        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          {/* Redirect root to /home */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/storybook" element={<Storybook />} />

          {/* All features 👇 */}
          <Route path="/reflect" element={<Reflect />} />
          <Route path="/archive" element={<ArchivePage />} />
          <Route path="/connect-soon" element={<ConnectSoonPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route path="/saveanote" element={<SaveNotePage />} />

          {/* About me page 👇 */}
          <Route path="/heart" element={<HeartPage />} />
          {/* <Route path="/about" element={<BreatheLandingPage />} /> */}
        </Routes>
      </MainLayout>
    </Router>
  );
}
