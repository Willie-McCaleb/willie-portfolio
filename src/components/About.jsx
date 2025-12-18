import { DialogueBox } from "./DialogueBox.jsx";

function About({ onComplete }) {
  const ABOUT_DIALOGUE = [
    "I'm a web developer who loves making things move.",
    "I build interactive experiences that are fun to use and easy to navigate.",
    "I like working with curious minds and teams who care about the details.",
    "When I’m not coding, I experiment with motion and ways to bring ideas to life.",
    "I'm a simple person who enjoys the little things in life."
  ];

  return (
    <DialogueBox
      dialogue={ABOUT_DIALOGUE}
      onComplete={onComplete}
      // No choices prop = caret appears on last line
    />
  );
}

export default About;
