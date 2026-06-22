import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from '../components/projects/ProjectCard';

export default function CompletedPage() {
	const statusKey = (s) =>
		(s || "").toLowerCase().trim().replace(/[_\s]+/g, "-");

	const {projects} = useContext(ProjectContext)

	const completed = projects.filter(p => p.status === "complete" && p.completed_at);

	// Days to complete project stat
	function getDaysToComplete(project) {
		const start = new Date(project.created_at);
		const end = new Date(project.completed_at);
		return Math.round((end - start) / (1000 * 60 * 60 * 24));
	}

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
					daysToComplete = {getDaysToComplete(project)}
					/>
				</div>
			  ))}
			</div>
		  )}
		</>
	  )
	}