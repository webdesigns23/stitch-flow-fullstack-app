
export default function ProjectCard({project}) {
	return(
		<>
			<h2>{project.title}</h2>
			<p>Status: "{project.status}"</p>
			<p>Notes: {project.notes}</p>
		</>
	)
}