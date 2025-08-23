import { useContext } from 'react'
import ProjectCard from "./ProjectCard"
import { ProjectContext } from '../../context/ProjectContext';

export default function ProjectGallery() {
	const statusKey = (s) =>
		(s || "").toLowerCase().trim().replace(/[_\s]+/g, "-");

	const {
		projects, 
		loading, 
		error, 
		deleteProject,
		updateProject,
	} = useContext(ProjectContext)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>

  return (
	<>
	  {projects.length === 0 ? (
		<p>No projects found!</p>
	  ): (
		<div className="gallery">
		  {projects.map(project => (
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