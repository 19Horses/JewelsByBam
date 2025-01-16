import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./landingPage";
import Details from "./mainPage";

function App() {
  return (
    <Router>
      <Routes key={location.pathname}>
        <Route path="/" exact element={<LandingPage />} />
        <Route path="/works" element={<Details />} />
        <Route path="details/:urlName" element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
