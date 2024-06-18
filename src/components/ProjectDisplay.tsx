import { Project } from "@prisma/client";

export default function ProjectDisplay({ projects }: { projects: Project[] }) {
  return (
    <div className="flex items-center justify-center bg-slate-500">
      {projects.map((project) => (
        <div key={project.id} className="flex flex-col">
          <h1 className="text-xl font-semibold">{project.name}</h1>
          <p className="text-sm text-gray-200">{project.description}</p>
          {project.link && (
            <a href={project.link} target="_blank">
              Link (replace with icon)
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
