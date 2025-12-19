import { useState } from "react";
import { DialogueBox } from "./DialogueBox.jsx";
import "../CSS/Contact.css";

const INITIAL_DIALOGUE = [
  "Let's connect! Feel free to send me a message anytime.",
  "Please choose the type of message you'd like to send:",
];

const INQUIRY_DIALOGUE = [
  "Great choice! I love hearing about potential projects and collaborations.",
  "Please fill out the form below and I'll get back to you soon!",
];

const GENERAL_DIALOGUE = [
  "I appreciate you taking the time to connect with me!",
  "Please fill out the form below and I'll respond as soon as possible.",
];

const CHOICE_DIALOGUE = [
  "Please choose the type of message you'd like to send:",
];

const SUCCESS_DIALOGUE = [
  "Message sent successfully! 🎉",
  "Thank you for reaching out, I'll get back to you as soon as possible!"
];

const getSuccessDialogue = (userName) => {
  if (userName) {
    return [
      "Message sent successfully! 🎉",
      `Thank you for reaching out, ${userName}! I'll get back to you as soon as possible!`
    ];
  }
  return SUCCESS_DIALOGUE;
};

function Contact({ onComplete, userName }) {
  const [stage, setStage] = useState("initial");
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    timeline: "",
    budget: "",
    message: "",
    interests: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Replace with your actual Web3Forms access key
  // Need to hide this in future updates
  const WEB3FORMS_ACCESS_KEY = "d7669523-2caa-4133-8f2c-16f65963de14";

  const interestOptions = [
    "Website Design",
    "Website Development",
    "Design Support",
    "Something else...",
  ];

  const handleChoice = (choice) => {
    setSelectedChoice(choice);
    setStage("follow-up");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async () => {
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitError("Please fill out all required fields (*)");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          timeline: formData.timeline,
          budget: formData.budget,
          message: formData.message,
          interests: formData.interests.join(", "),
          subject: `New ${selectedChoice} from ${formData.name}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStage("success");
      } else {
        setSubmitError("Failed to send message. Please try again.");
      }
    } catch (error) {
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const handleBack = () => {
    setStage("choice");
    setSelectedChoice(null);
    setFormData({
      name: "",
      company: "",
      email: "",
      timeline: "",
      budget: "",
      message: "",
      interests: [],
    });
    setSubmitError(null);
  };

  // Render the form component
  const renderForm = () => (
    <div className="contact-container" onClick={(e) => e.stopPropagation()}>
      {/* Back Button */}
      <div className="contact-back-btn-wrapper">
        <button
          className={`choice-btn ${isSubmitting ? 'contact-btn-disabled' : ''}`}
          onClick={handleBack}
          disabled={isSubmitting}
        >
          <span className="btn-face">Return</span>
        </button>
      </div>

      {/* Interests Section - Only show for Inquiry */}
      {selectedChoice === "Inquiry" && (
        <div className="contact-section">
          <label className="contact-label">What are you looking for?</label>
          <div className="contact-checkbox-grid">
            {interestOptions.map((interest) => {
              const isChecked = formData.interests.includes(interest);
              return (
                <label key={interest} className="contact-checkbox-label">
                  <div
                    onClick={() => handleInterestToggle(interest)}
                    className={`contact-checkbox-wrapper ${isChecked ? 'checked' : ''}`}
                  >
                    <div className="contact-checkbox-face">
                      {isChecked && (
                        <svg
                          style={{
                            width: "12px",
                            height: "12px",
                            color: "var(--black);",
                          }}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="contact-checkbox-text">{interest}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Name */}
      <div className="contact-section">
        <label htmlFor="name" className="contact-label">
          What's your name? *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="contact-input"
          placeholder="Your name"
        />
      </div>

      {/* Company - Only show for Inquiry */}
      {selectedChoice === "Inquiry" && (
        <div className="contact-section">
          <label htmlFor="company" className="contact-label">
            What's your company name?
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="contact-input"
            placeholder="Your company"
          />
        </div>
      )}

      {/* Email */}
      <div className="contact-section">
        <label htmlFor="email" className="contact-label">
          What's your email address? *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className="contact-input"
          placeholder="Your email address"
        />
      </div>

      {/* Timeline - Only show for Inquiry */}
      {selectedChoice === "Inquiry" && (
        <div className="contact-section">
          <label htmlFor="timeline" className="contact-label">
            What's your timeline?
          </label>
          <input
            type="text"
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleInputChange}
            className="contact-input"
            placeholder="Your ideal launch date"
          />
          <p className="contact-helper-text">
            Knowing your deadline helps us to negotiate a realistic timeline
          </p>
        </div>
      )}

      {/* Budget - Only show for Inquiry */}
      {selectedChoice === "Inquiry" && (
        <div className="contact-section">
          <label htmlFor="budget" className="contact-label">
            What's your budget?
          </label>
          <input
            type="text"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            className="contact-input"
            placeholder="E.g., $5000"
          />
          <p className="contact-helper-text">
            Ballpark budgets help us create a better, more accurate proposal
          </p>
        </div>
      )}

      {/* Message */}
      <div className="contact-section">
        <label htmlFor="message" className="contact-label">
          {selectedChoice === "Inquiry"
            ? "Tell us about your project *"
            : "Your message *"}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows="6"
          className="contact-textarea"
          placeholder={
            selectedChoice === "Inquiry"
              ? "Your project details"
              : "What would you like to say?"
          }
        />
        <div className="contact-char-count">{formData.message.length} / 3000</div>
      </div>

      {/* Error Message */}
      {submitError && <div className="contact-error">{submitError}</div>}

      {/* Submit Button */}
      <div className="submit-btn">
        <button
          className={`choice-btn contact-btn-full-width ${isSubmitting ? 'contact-btn-disabled' : ''}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          <span className="btn-face contact-submit-icon-wrapper">
            {isSubmitting ? "Sending..." : "Submit"}
          </span>
        </button>
      </div>
    </div>
  );

  // Stage 1: Initial dialogue with choices
  if (stage === "initial") {
    return (
      <DialogueBox
        dialogue={INITIAL_DIALOGUE}
        onComplete={() => {}}
        choices={["Inquiry", "General"]}
        onChoiceSelect={handleChoice}
      />
    );
  }

  // Stage 1b: Choice only (used when going back)
  if (stage === "choice") {
    return (
      <DialogueBox
        dialogue={CHOICE_DIALOGUE}
        onComplete={() => {}}
        choices={["Inquiry", "General"]}
        onChoiceSelect={handleChoice}
      />
    );
  }

  // Stage 2: Follow-up dialogue with form appearing below
  if (stage === "follow-up") {
    const followUpDialogue =
      selectedChoice === "Inquiry" ? INQUIRY_DIALOGUE : GENERAL_DIALOGUE;

    return (
      <DialogueBox
        dialogue={followUpDialogue}
        onComplete={() => {}}
        choices={[]}
        customContent={renderForm()}
      />
    );
  }

  // Stage 3: Success dialogue
  if (stage === "success") {
    return (
      <DialogueBox
        dialogue={getSuccessDialogue(userName)}
        onComplete={handleSuccessComplete}
        choices={[]}
      />
    );
  }

  return null;
}

export default Contact;