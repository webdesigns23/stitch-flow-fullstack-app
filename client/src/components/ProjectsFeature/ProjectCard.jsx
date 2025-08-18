
export default function ProjectCard({project}) {
	return(
		<>
			<h2>{project.title}</h2>
			<p>{project.status}</p>
			<p>{project.notes}</p>
		</>
	)
}