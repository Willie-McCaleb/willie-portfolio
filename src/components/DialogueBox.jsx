// ===============================
// DialogueBox.jsx
// ===============================
import React, { useEffect, useRef, useState } from "react";
import "../CSS/dialogue.css";

export function DialogueBox({ dialogue, onComplete, choices, onChoiceSelect }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);

  const intervalRef = useRef(null);

  // Reset state when dialogue changes
  useEffect(() => {
    setLineIndex(0);
    setText("");
    setIsTyping(false);
    setShowChoices(false);
  }, [dialogue]);

  // Start typing current line
  useEffect(() => {
    startTyping(dialogue[lineIndex]);
    return () => clearInterval(intervalRef.current);
  }, [lineIndex, dialogue]);

  const startTyping = (line) => {
    clearInterval(intervalRef.current);
    setText("");
    setIsTyping(true);

    let i = 0;

    intervalRef.current = setInterval(() => {
      if (i < line.length) {
        setText(line.substring(0, i + 1));
        i++;
      } else {
        clearInterval(intervalRef.current);
        setIsTyping(false);

        // If this is the last line and we have choices, show them
        if (
          lineIndex === dialogue.length - 1 &&
          choices &&
          choices.length > 0
        ) {
          setShowChoices(true);
          onComplete();
        }
      }
    }, 30);
  };

  const advance = () => {
    // If currently typing, skip to end of current line
    if (isTyping) {
      clearInterval(intervalRef.current);
      setText(dialogue[lineIndex]);
      setIsTyping(false);

      // If this was the last line with choices, show them
      if (lineIndex === dialogue.length - 1 && choices && choices.length > 0) {
        setShowChoices(true);
        onComplete();
      }
      return;
    }

    // If not on last line, advance to next line
    if (lineIndex < dialogue.length - 1) {
      setLineIndex((i) => i + 1);
    } else if (!choices || choices.length === 0) {
      // If on last line with no choices, complete
      onComplete();
    }
  };

  const handleChoiceClick = (choice) => {
    // Check if choice is an object with an action, or just a string
    if (typeof choice === "object" && choice.action) {
      choice.action();
    } else if (onChoiceSelect) {
      onChoiceSelect(choice);
    }
  };

  const hasChoices = choices && choices.length > 0;
  const isLastLine = lineIndex === dialogue.length - 1;
  const shouldShowCaret = !isTyping && (!isLastLine || !hasChoices);

  return (
    <div className="dialogue-container">
      <div className="dialogue-box" onClick={showChoices ? undefined : advance}>
        <p className="dialogue-text">{text}</p>
        {shouldShowCaret && <span className="dialogue-caret">▶</span>}
      </div>

      {showChoices && (
        <div className="choices">
          {choices.map((choice, index) => {
            // Handle both string choices and object choices
            const isObjectChoice = typeof choice === "object" && choice.text;
            const useButtonStyle = !isObjectChoice || choice.useButtonStyle;
            const displayText = isObjectChoice ? choice.text : choice;
            const key = isObjectChoice ? index : choice;

            return (
              <button
                key={key}
                className={useButtonStyle ? "choice-btn" : "choice"}
                onClick={() => handleChoiceClick(choice)}
              >
                {useButtonStyle ? (
                  <span className="btn-face">{displayText}</span>
                ) : (
                  displayText
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
