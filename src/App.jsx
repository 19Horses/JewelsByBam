import "./App.css";
import { HashRouter as Router, Link, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage";
import Details from "./details";
import { isMobile } from "react-device-detect";
import MobileGallery from "./gallery/MobileGallery";
import DesktopGallery from "./gallery/DesktopGallery";

function App() {
  return (
    <Router>
      <Link to="/">
        <p className="fixed top-0 text-red-800 z-10">JEWELS BY BAM</p>
      </Link>
      <Routes>
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
