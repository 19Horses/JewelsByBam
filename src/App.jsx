import { ReactP5Wrapper } from "@p5-wrapper/react";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import LandingPage from "./landingPage";
import Details from "./mainPage";
import { sketch } from "./sketch";
import { ErrorBoundary } from "react-error-boundary";
import { Fallback } from "./components/Fallback";
import { useState } from "react";

function App() {
  const [isError, setIsError] = useState(false);
  return (
    <>
      <Router
        future={{
          v7_startTransition: true,
        }}
      >
        <Routes key={location.pathname}>
          <Route
            path="/"
            exact
            element={
              <ErrorBoundary
                onError={() => setIsError(true)}
                fallback={<Fallback />}
              >
                <LandingPage />
              </ErrorBoundary>
            }
          />
          <Route path="/works" element={<Details />} />
        </Routes>
      </Router>
      <ReactP5Wrapper sketch={(p5) => sketch(p5, isError)} />
    </>
  );
}

export default App;
