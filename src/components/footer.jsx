import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-item">
        <Link to="/">
          <a className="footer-item" target="blank">
            home
          </a>
        </Link>
      </div>
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
