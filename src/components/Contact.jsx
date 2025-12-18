import { useState } from "react";
import { DialogueBox } from "./DialogueBox.jsx";

function Contact({ onComplete }) {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const INITIAL_DIALOGUE = [
    "Let’s connect! Feel free to send me a message anytime.",
    "Please choose the type of message you'd like to send:"
  ];

  const INQUIRY_DIALOGUE = [
    "Great choice! I love hearing about potential projects and collaborations."
  ];

  const GENERAL_DIALOGUE = [
    "I appreciate you taking the time to connect with me!"
  ];

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
  };

  const handleDialogueComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // Show initial dialogue with choices
  if (!selectedChoice) {
    return (
      <DialogueBox
        dialogue={INITIAL_DIALOGUE}
        onComplete={() => {}}
        choices={["Inquiry", "General"]}
        onChoiceSelect={handleChoice}
      />
    );
  }

  // Show follow-up dialogue based on choice
  const followUpDialogue = selectedChoice === "Inquiry" ? INQUIRY_DIALOGUE : GENERAL_DIALOGUE;

  return (
    <DialogueBox
      dialogue={followUpDialogue}
      onComplete={handleDialogueComplete}
      choices={[]}
    />
  );
}

export default Contact;