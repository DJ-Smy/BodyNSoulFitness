import React from "react";
import "./footer.css";
import Github from "../../assets/github.png";
import Instagram from "../../assets/instagram.png";
import LinkIn from "../../assets/linkedin.png";
import Logo from "../../assets/logo.png";

function Footer() {
  return (
    <div className="Footer-container">
      <hr />
      <div className="footer1">
        <div className="social-links">
          <img src={Github} alt="1" />
          <img src={Instagram} alt="2" />
          <img src={LinkIn} alt="3" />
        </div>
        <div className="logo-f">
          <img src={Logo} alt="4" />
        </div>
      </div>
      <div className="blur blur-f-1"></div>
      <div className="blur blur-f-2"></div>
    </div>
  );
}

export default Footer;
