import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage";
import Details from "./mainPage";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { sketch } from "./sketch";

function App() {
  return (
    <>
      <Router>
        <Routes key={location.pathname}>
          <Route path="/" exact element={<LandingPage />} />
          <Route path="/works" element={<Details />} />
        </Routes>
      </Router>
      <ReactP5Wrapper sketch={sketch} />
    </>
  );
}

export default App;
