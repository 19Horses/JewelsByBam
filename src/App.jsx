import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage";
import Details from "./mainPage";
import { sketch } from "./sketch";

function App() {
  return (
    <>
      <Router
        future={{
          v7_startTransition: true,
        }}
      >
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
