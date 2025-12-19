import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import { DialogueBox } from "./components/DialogueBox.jsx";
import "./CSS/dialogue.css";
import { getUserData, saveUserData, updateLastVisit } from "./utils/userStorage.js";

const NAME_PROMPT_DIALOGUE = [
  "Hello there! My name is Willie.",
  "Before we begin, I'd love to know your name."
];

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [hasIntroPlayed, setHasIntroPlayed] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [userName, setUserName] = useState(null);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [nameInputStage, setNameInputStage] = useState(false);
  const [tempName, setTempName] = useState('');

  // Check localStorage on mount for returning users
  useEffect(() => {
    const userData = getUserData();

    if (userData) {
      // Returning user
      setUserName(userData.name);
      setIsFirstVisit(false);
      setNameInputStage(false);
      updateLastVisit();
    } else {
      // First-time user
      setIsFirstVisit(true);
      setNameInputStage(true);
    }
  }, []);

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

  const handleNameSubmit = () => {
    const trimmedName = tempName.trim();

    if (!trimmedName) return;

    saveUserData(trimmedName);
    setUserName(trimmedName);
    setNameInputStage(false);
    // Keep isFirstVisit as true so they see the full intro dialogue
  };

  const renderNameInput = () => (
    <div className="name-input-container" onClick={(e) => e.stopPropagation()}>
      <input
        type="text"
        placeholder="Enter your name"
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        className="dialogue-input"
        maxLength={50}
      />
      <button
        onClick={handleNameSubmit}
        className="choice-btn"
        disabled={!tempName.trim()}
      >
        <span className="btn-face">Continue</span>
      </button>
    </div>
  );

  const getIntroDialogue = () => {
    if (hasIntroPlayed) {
      // User clicked back from a section
      return [`What else would you like to explore${userName ? ', ' + userName : ''}?`];
    } else if (isFirstVisit) {
      // First time ever visiting (after providing name)
      return [
        "I'm a web developer with a passion for creating interactive and engaging web experiences.",
        `So tell me, ${userName}… what would you like to explore?`
      ];
    } else {
      // Returning visitor - skip intro, go straight to menu
      return [`Welcome back, ${userName}! What would you like to explore today?`];
    }
  };

  return (
    <div className="page">
      <Header onReset={handleReset} />

      <div className="hero-main-wrapper">
        <Hero />

        <div className="game-container">
          {!activeSection && (
            <>
              {nameInputStage ? (
                <DialogueBox
                  key={`name-${resetKey}`}
                  dialogue={NAME_PROMPT_DIALOGUE}
                  onComplete={() => {}}
                  customContent={renderNameInput()}
                />
              ) : (
                <DialogueBox
                  key={resetKey}
                  dialogue={getIntroDialogue()}
                  onComplete={handleDialogueComplete}
                  choices={["About Me", "Projects", "Contact"]}
                  onChoiceSelect={handleChoiceSelect}
                />
              )}
            </>
          )}

          {activeSection === "about" && <About onComplete={handleSectionComplete} />}
          {activeSection === "projects" && <Projects onComplete={handleSectionComplete} />}
          {activeSection === "contact" && <Contact onComplete={handleSectionComplete} userName={userName} />}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;