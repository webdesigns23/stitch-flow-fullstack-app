import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from '../components/ProjectsFeature/ProjectCard';

export default function CompleteProjects() {
	const statusKey = (s) =>
		(s || "").toLowerCase().trim().replace(/[_\s]+/g, "-");

	const {projects, deleteProject, updateProject,} = useContext(ProjectContext)

	const completed = projects.filter(p => p.status === "complete");

	return (
		<>
		<h1>Finished Projects</h1>
		  {completed.length === 0 ? (
			<p>No completed projects yet!</p>
		  ): (
			<div className="gallery">
			  {completed.map(project => (
				<div key={project.id} 
				className="gallery-item" 
				data-status={statusKey(project.status)}>
					<ProjectCard 
					project={project} 
					handleDelete={() => deleteProject(project.id)}
					updateProject={(updates) => updateProject(project.id, updates)}
					/>
				</div>
			  ))}
			</div>
		  )}
		</>
	  )
	}