import { isMobile } from "react-device-detect";

export const Footer = () => {
  return (
    <div className={`footer-container ${isMobile ? "mobile" : ""}`}>
      <div className="footer-item">
        <a
          href="https://www.instagram.com/jewelsbybam/"
          className="footer-item"
          target="blank"
        >
          insta
        </a>
      </div>
      <div className="footer-item">
        <a
          href="mailto:jewelzbybam@gmail.com"
          className="footer-item"
          target="blank"
        >
          email
        </a>
      </div>
    </div>
  );
};
