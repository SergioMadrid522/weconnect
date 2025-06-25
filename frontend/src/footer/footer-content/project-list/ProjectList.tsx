import type { ProjectListProps } from "../../type.ts";
function ProjectList({ projects }: ProjectListProps) {
  return (
    <div className="projects">
      <h3>Projects</h3>
      <ul>
        {projects.map((project, index) => (
          <li key={index}>
            <a href={project.link} target="_blank" rel="noopener">
              {project.projectName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProjectList;
