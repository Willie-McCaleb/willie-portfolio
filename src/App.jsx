import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import { DialogueBox } from "./components/DialogueBox.jsx";
import "./CSS/dialogue.css";

const INTRO_DIALOGUE = [
  "Welcome, Trainer.",
  "This is my creative space.",
  "What would you like to explore?",
];

function App() {
  const [showChoices, setShowChoices] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <div className="page">
      <Header />

      <div className="hero-main-wrapper">
        <Hero />

        <div className="game-container">
          {!showChoices && (
            <DialogueBox
              dialogue={INTRO_DIALOGUE}
              onComplete={() => setShowChoices(true)}
            />
          )}

          {showChoices && (
            <div className="choices">
              {["About Me", "Projects", "Contact"].map((choice) => (
                <button
                  key={choice}
                  className="choice-btn"
                  onClick={() => setActiveModal(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{activeModal}</h2>
            <p>Content for {activeModal} goes here.</p>
            <button onClick={() => setActiveModal(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
