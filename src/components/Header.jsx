// src/components/Header.jsx
import React from "react";

function Header() {
  return (
    <header className="top-bar">
      <span className="top-bar__location">Jackson, Mississippi 11:30 AM</span>

      <div className="top-bar__right">
        <div className="top-bar__status">
          <span className="status-dot"></span>
          <span>Available for Work</span>
        </div>

        <button className="top-bar__button">
          <span className="btn-face">Let's Chat</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
