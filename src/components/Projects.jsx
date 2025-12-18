import { DialogueBox } from "./DialogueBox.jsx";
import "../CSS/Projects.css";

function Projects({ onComplete }) {
  const PROJECTS_DIALOGUE = ["Here are some of my recent projects."];

  const projects = [
    {
      title: "CLAYNOSAURZ BOOSTER PACKS",
      subtitle: "App",
      action: "Visit",
      url: "https://your-link.com",
    },
    {
      title: "MYLIIO",
      subtitle: "Website",
      action: "Visit",
      url: "https://your-link.com",
    },
    {
      title: "THE MAISON OF ALL VICTORIES",
      subtitle: "Website",
      action: "Visit",
      url: "https://your-link.com",
    },
    {
      title: "VIRGIN GALACTIC",
      subtitle: "Website",
      action: "Upcoming",
      url: "https://your-link.com",
    },
  ];

  const projectChoices = projects.map((project) => ({
    text: (
      <div className="project-item">
        <div className="project-info">
          <div className="project-title">{project.title}</div>
          <div className="project-line"></div>
          <span className="project-action-text">{project.action}</span>
        </div>
        <div className="project-subtitle">{project.subtitle}</div>
      </div>
    ),
    action: () => window.open(project.url, "_blank"),
  }));

  // Add a "Back" option at the end
  projectChoices.push({
    text: "Back to Menu",
    action: onComplete,
    useButtonStyle: true, // Add this flag to indicate button styling
  });

  return (
    <div className="projects-section">
      <DialogueBox
        dialogue={PROJECTS_DIALOGUE}
        onComplete={() => {}} // Empty function - don't unmount yet!
        choices={projectChoices}
      />
    </div>
  );
}

export default Projects;
