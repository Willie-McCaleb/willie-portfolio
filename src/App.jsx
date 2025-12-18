import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { DialogueBox } from "./components/DialogueBox.jsx";
import "./CSS/dialogue.css";

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  const [resetKey, setResetKey] = useState(0); // Add this

  const INTRO_DIALOGUE = [
    "Hello there! My name is Willie.",
    "I'm a web developer with a passion for creating interactive and engaging web experiences.",
    "So tell me… what would you like to explore?"
  ];

  const RETURN_DIALOGUE = [
    "What else would you like to explore?"
  ];

  const handleReset = () => {
    setActiveSection(null);
    setHasIntroPlayed(false);
    setResetKey(prev => prev + 1); // Increment to force remount
    window.scrollTo(0, 0);
  };

  const handleSectionComplete = () => {
    setActiveSection(null);
  };

  const handleDialogueComplete = () => {
    // Don't do anything here - we'll set hasIntroPlayed when they make a choice
  };

  const handleChoiceSelect = (choice) => {
    // Mark intro as played on first choice selection
    if (!hasIntroPlayed) {
      setHasIntroPlayed(true);
    }

    if (choice === "About Me") {
      setActiveSection("about");
    } else if (choice === "Projects") {
      setActiveSection("projects");
    } else if (choice === "Contact") {
      setActiveSection("contact");
    }
  };

  return (
    <div className="page">
      <Header onReset={handleReset} />

      <div className="hero-main-wrapper">
        <Hero />

        <div className="game-container">
          {!activeSection && (
            <DialogueBox
              key={resetKey} // Add this key
              dialogue={hasIntroPlayed ? RETURN_DIALOGUE : INTRO_DIALOGUE}
              onComplete={handleDialogueComplete}
              choices={["About Me", "Projects", "Contact"]}
              onChoiceSelect={handleChoiceSelect}
            />
          )}

          {activeSection === "about" && <About onComplete={handleSectionComplete} />}
          {activeSection === "projects" && <Projects onComplete={handleSectionComplete} />}
          {activeSection === "contact" && <Contact onComplete={handleSectionComplete} />}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;