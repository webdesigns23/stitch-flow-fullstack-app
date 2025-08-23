import { Link } from "react-router-dom"

export default function ProjectCard({project, handleDelete, updateProject}) {
	const p = project?.pattern;
	const patternId = p?.id ?? project?.pattern_id;

	const statuses = [
		"planning", "ready_to_sew", "cutting", "sewing", "final_touches", "complete"
	];

	function handleStatusChange(e) {
		const newStatus = e.target.value;
		updateProject({status: newStatus});
	}

	return(
		<div className="project-card">
			<h2>{project.title}</h2>
			
			 <label className="status-control">
          		<span>Status:</span>
          		<select value={project.status} onChange={handleStatusChange}>
            		{statuses.map(s => (
              			<option key={s} value={s}>
                			{s.replace(/_/g, " ")}
              			</option>
            		))}
          		</select>
        	</label>
			
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
		</div>
	)
}