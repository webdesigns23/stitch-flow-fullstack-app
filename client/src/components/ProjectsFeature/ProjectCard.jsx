
export default function ProjectCard({project, handleDelete}) {

	return(
		<>
			<h2>{project.title}</h2>
			<p>Status: "{project.status}"</p>
			<p>Notes: {project.notes}</p>
			<p>Created: {project.created_at}</p>
			{project.updated_at && <p>Updated: {project.updated_at}</p>}
			<button onClick={handleDelete}>Remove</button>
		</>
	)
}