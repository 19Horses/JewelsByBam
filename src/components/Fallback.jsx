import { isMobile } from "react-device-detect";
import { Footer } from "./footer";
import { useState } from "react";

export const Fallback = () => {
  const [clicked, setIsClicked] = useState(false);
  return (
    <>
      <div className="nav-container">
        <p
          className={`header ${isMobile ? "mobile" : ""} header-container`}
          style={{ cursor: "auto" }}
        >
          Jewels by Bam
        </p>
      </div>
      <Footer />
      <div className="info">
        <button
          onClick={() => setIsClicked((prev) => !prev)}
          className={`${isMobile ? "mobile" : ""} ${clicked ? "clicked" : ""}`}
        >
          i
        </button>
        {clicked && (
          <p
            onClick={() => setIsClicked((prev) => !prev)}
            className="info-text"
          >
            For the full experience enable WebGL 2.0 :)
          </p>
        )}
      </div>
    </>
  );
};
