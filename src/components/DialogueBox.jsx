// STEP-BY-STEP FOUNDATION
// 1. Reusable <DialogueBox /> component
// 2. Mobile-first styling with vanilla CSS
// 3. No sound effects
// 4. Supports dialogue flow → choices → modal popups

// ===============================
// DialogueBox.jsx
// ===============================
import React, { useEffect, useRef, useState } from "react";
import "../CSS/dialogue.css";

export function DialogueBox({ dialogue, onComplete }) {
  const [lineIndex, setLineIndex] = useState(0);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    startTyping(dialogue[lineIndex]);
    return () => clearInterval(intervalRef.current);
  }, [lineIndex]);

  const startTyping = (line) => {
    clearInterval(intervalRef.current);
    setText("");
    setIsTyping(true);

    let i = 0;

    intervalRef.current = setInterval(() => {
      if (i < line.length) {
        setText(line.substring(0, i + 1)); // Fix: use substring instead
        i++;
      } else {
        clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, 30);
  };

  const advance = () => {
    if (isTyping) {
      clearInterval(intervalRef.current);
      setText(dialogue[lineIndex]);
      setIsTyping(false);
      return;
    }

    if (lineIndex < dialogue.length - 1) {
      setLineIndex((i) => i + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="dialogue-box" onClick={advance}>
      <p className="dialogue-text">{text}</p>
      <span className={`dialogue-caret ${isTyping ? "invisible" : ""}`}>▶</span>
    </div>
  );
}
