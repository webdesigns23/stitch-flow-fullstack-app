import { useContext, useState } from 'react'
import ProjectCard from './ProjectCard';
import { ProjectContext } from '../context/ProjectContext';
import StatusFilter from './StatusFilter';

export default function ProjectGallery() {
	const [statusFilter, setStatusFilter] = useState("all");

	//For css color status
	const statusKey = (s) =>
		(s || "").toLowerCase().trim().replace(/[_\s]+/g, "-");

	const {
		projects, loading, error, 
		deleteProject,updateProject,
	} = useContext(ProjectContext)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>

	//Status Filter
	const filteredProjects = projects.filter((p) => {
		const projectStatus = statusFilter === "all" ||
		(statusFilter === "planning" && p.status === "planning") ||
		(statusFilter === "ready_to_sew" && p.status === "ready_to_sew") ||
		(statusFilter === "cutting" && p.status === "cutting") ||
		(statusFilter === "sewing" && p.status === "sewing") ||
		(statusFilter === "final_touches" && p.status === "final_touches");
		
		return projectStatus;
	});

  return (
	<>
		<StatusFilter statusFilter={statusFilter} onChange={setStatusFilter} />

	  	{filteredProjects.length === 0 ? (
			<p>No projects found with that status!</p>
	 	): (
		<div className="gallery">
			
		  {filteredProjects
		  .filter(project => project.status !== "complete")
		  .map(project => (
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




