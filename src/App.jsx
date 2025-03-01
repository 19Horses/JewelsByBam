import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage";
import Details from "./mainPage";

function App() {
  return (
    <Router>
      <Routes key={location.pathname}>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/works" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
