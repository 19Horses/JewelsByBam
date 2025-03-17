import { isMobile } from "react-device-detect";
import { Footer } from "./footer";

export const Fallback = () => {
  return (
    <>
      <div className="nav-container">
        <p className={`header ${isMobile ? "mobile" : ""} header-container`}>
          Jewels by Bam
        </p>
      </div>
      <Footer />
    </>
  );
};
