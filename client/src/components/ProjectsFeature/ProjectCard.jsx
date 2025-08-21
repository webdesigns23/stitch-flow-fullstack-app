import { Link } from "react-router-dom"

export default function ProjectCard({project, handleDelete}) {
	const p = project?.pattern;
	const patternId = p?.id ?? project?.pattern_id;

	return(
		<>
			<h2>{project.title}</h2>
			<p>Status: "{project.status}"</p>
			<p>Notes: {project.notes || "-"}</p>

			{/* linked pattern */}
			<p>Pattern:{" "}
				{patternId ?(
				<Link to={`/patterns/${patternId}`} >
				{`${p.name} (${p.brand})`}
				</Link>
				):(
					"No pattern linked to project"
				)}
			</p>
			
			<p>Created: {project.created_at}</p>
			{project.updated_at && <p>Updated: {project.updated_at}</p>}
			<button className="delete_button" onClick={handleDelete}>Remove</button>
		</>
	)
}