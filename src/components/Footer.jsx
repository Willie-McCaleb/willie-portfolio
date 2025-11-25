// src/components/Footer.jsx
import React from "react";
import { FaTiktok , FaLinkedinIn , FaYoutube  } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__icons">
        <button href="#" className="footer__icon">
           <span className="btn-face"><FaYoutube  size={24} /></span>
        </button>
        <button href="#" className="footer__icon">
           <span className="btn-face"><FaLinkedinIn  size={24} /></span>
        </button>
        <button href="#" className="footer__icon">
 <span className="btn-face"><FaTiktok size={24} /></span>
        </button>
      </div>

      <div className="footer__copy">© 2025 WILLIE JR.</div>
    </footer>
  );
}

export default Footer;
