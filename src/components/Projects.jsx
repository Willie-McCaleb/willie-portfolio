// src/components/Projects.jsx
const projects = [
  { id: 1, thumb: " ", title: "Test Project", tag: "Game" },
  { id: 2, thumb: " ", title: "Test Project", tag: "WEBSITE" },
  { id: 3, thumb: " ", title: "Test Project", tag: "WEBSITE" },
  { id: 4, thumb: " ", title: "Test Project", tag: "WEBSITE" },
];

function Projects() {
  return (
    <section className="projects">
      <h2 className="projects__title">PROJECTS</h2>

      <div className="projects__grid">
        {projects.map((project) => (
          
            <a key={project.id} href= {project.link} className="project-card">
              <div className="project-card__thumb">{project.thumb}</div>

              <div className="project-card__info">
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__tag">{project.tag}</p>
              </div>
            </a>
          
        ))}
      </div>
    </section>
  );
}

export default Projects;
