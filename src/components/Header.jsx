import React from "react";

function Header({ onReset }) {
  return (
    <header className="top-bar">
      <span 
        className="logo" 
        onClick={onReset}
        style={{ cursor: 'pointer' }}
      >
        Willie Jr.
      </span>

      <div className="top-bar__right">
        <div className="top-bar__status">
          <span className="status-dot"></span>
          <span>Available for Work</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
