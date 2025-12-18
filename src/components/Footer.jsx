// src/components/Footer.jsx
import React from "react";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="nav__icons">
        <button href="#" className="nav__icon">
          <FaLinkedinIn size={22} />
        </button>
        <button href="#" className="nav__icon">
          <FaInstagram size={22} />
        </button>
        <button href="#" className="nav__icon">
          <FaYoutube size={22} />
        </button>
      </div>

      <div className="footer__copy">©2025 Portfolio.</div>
    </footer>
  );
}

export default Footer;
