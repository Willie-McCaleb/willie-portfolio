// src/components/Hero.jsx
import React from "react";
import RiveCharacter from "./RiveCharacter.jsx";
// import avatar from "../assets/avatar.png"; // Importing interactive avatar from Rive

function Hero() {
  return (
    <section className="hero">
      <h1 className="hero__title">WILLIE JR.</h1>

      <div className="hero__subline">
        <span>Step Into My</span>
        <span>Creative Lab</span>
      </div>

      <RiveCharacter />

    </section>
  );
}

export default Hero;
