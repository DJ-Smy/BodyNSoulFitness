import React, { useState } from "react";
import "./header.css";
import Logo from "../../assets/logo.png";
import Bars from "../../assets/bars.png";
import { Link } from "react-scroll";

function Header() {
  const mobile = window.innerWidth <= 768 ? true : false;
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="header1">
      <img className="logo" src={Logo} alt="logo" />
      {menuOpen === false && mobile === true ? (
        <div
          style={{ backgroundColor: "var(--appColor)", padding: "0.5rem", borderRadius: "5px" }}
          onClick={() => setMenuOpen(true)}
        >
          <img src={Bars} alt="hamBar" style={{ width: "1.5rem", height: "1.5rem" }} />
        </div>
      ) : (
        <ul className="header-menu">
          <li>
            <Link onClick={() => setMenuOpen(false)} to="hero" span={true} smooth={true}>
              Home
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} to="Programs" span={true} smooth={true}>
              Programs
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} to="Reasons" span={true} smooth={true}>
              Why us
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} to="plans" span={true} smooth={true}>
              Plans
            </Link>
          </li>

          <li>
            <Link onClick={() => setMenuOpen(false)} to="Testimonials" span={true} smooth={true}>
              Testimonials
            </Link>
          </li>
          <li>
            <Link onClick={() => setMenuOpen(false)} to="Join" span={true} smooth={true}>
              Join
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Header;
