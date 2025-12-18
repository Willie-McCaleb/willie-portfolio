// src/components/RiveCharacter.jsx
import React from "react";
import Rive from "@rive-app/react-canvas";
import characterFile from "../assets/portfolio_character.riv?url";
import "./../CSS/Rive.css";


function RiveCharacter() {
  return (
    <div className="rive-character">
      {/* 
        If your file uses a State Machine, you can pass stateMachines="State Machine 1"
        or whatever you named it in Rive.
        If it’s just a timeline animation, autoplay alone is fine.
      */}
      <Rive src={characterFile} autoPlay />
    </div>
  );
}

export default RiveCharacter;
