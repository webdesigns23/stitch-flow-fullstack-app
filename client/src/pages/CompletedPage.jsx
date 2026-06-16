import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from '../components/projects/ProjectCard';

export default function CompletedPage() {
	const statusKey = (s) =>
		(s || "").toLowerCase().trim().replace(/[_\s]+/g, "-");

	const {projects, deleteProject, updateProject,} = useContext(ProjectContext)

	const completed = projects.filter(p => p.status === "complete" && p.completed_at);

	return (
		<>
		<h1>Finished Projects</h1>
		  {completed.length === 0 ? (
			<h2>No completed projects yet!</h2>
		  ): (
			<div className="gallery">
			  {completed.map(project => (
				<div key={project.id} 
				className="gallery-item" 
				data-status={statusKey(project.status)}>
					<ProjectCard 
					project={project} 
					isCompleted={true}
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