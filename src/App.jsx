import { Link, Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Details from "./details";
import DesktopGallery from "./gallery/DesktopGallery";
import MobileGallery from "./gallery/MobileGallery";

import LandingPage from "./landingPage";
import { isMobile } from "react-device-detect";

function App() {
  return (
    <Router>
      <Link to="/">
        <p className="fixed top-0 text-red-800 z-10">JEWELS BY BAM</p>
      </Link>
      <Routes key={location.pathname}>
        <Route path="/" exact element={<LandingPage />} />
        <Route
          path="/items"
          element={isMobile ? <MobileGallery /> : <DesktopGallery />}
        />
        <Route path="details/:urlName" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
