
export default function ProjectCard({project, handleDelete}) {
	return(
		<>
			<h2>{project.title}</h2>
			<p>Status: "{project.status}"</p>
			<p>Notes: {project.notes}</p>
			<button onClick={handleDelete}>Remove</button>
		</>
	)
}