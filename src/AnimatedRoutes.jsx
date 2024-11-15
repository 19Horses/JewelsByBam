import { AnimatePresence } from "framer-motion";
import { isMobile } from "react-device-detect";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import DesktopGallery from "./gallery/DesktopGallery";
import MobileGallery from "./gallery/MobileGallery";
import LandingPage from "./landingPage";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" exact element={<LandingPage />} />
        <Route
          path="/items"
          element={isMobile ? <MobileGallery /> : <DesktopGallery />}
        />
        <Route path="details:id" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

function About() {
  const { id } = useParams();
  return (
    <div>
      <h2>Now showing post {id}</h2>
    </div>
  );
}
