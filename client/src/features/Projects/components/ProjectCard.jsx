import { Link } from "react-router-dom"
import { useContext } from "react";
import { PatternContext } from "../../Patterns/context/PatternContext"

export default function ProjectCard({project, handleDelete, updateProject}) {
	const { patterns, loading: patternLoading } = useContext(PatternContext);

	const p = project?.pattern;
	const patternId = p?.id ?? project?.pattern_id;

	const statuses = [
		"planning", "ready_to_sew", "cutting", "sewing", "final_touches", "complete"];

	async function handleStatusChange(e) {
		const newStatus = e.target.value;
		await updateProject({status: newStatus});
	}

	async function handlePatternChange(e) {
		const newPattern = e.target.value ? Number(e.target.value) : null;
		await updateProject({pattern_id: newPattern});
	}

	return(
		<div className="project-card">
			<h2>{project.title}</h2>

			{/* status dropdown */}
			 <label className="status-control">
          		<span>Status:</span>
          		<select value={project?.status} onChange={handleStatusChange}>
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
				{`${p?.name} (${p?.brand})`}
				</Link>
				):(
					"No pattern linked to project"
				)}
			</p>

			{/* change pattern */}
			{!patternLoading && (
			<label>
          		<span>Change Pattern:</span>
          		<select value={patternId ?? ""} onChange={handlePatternChange}>
					<option value= "">No Pattern Linked</option>
            		{patterns.map(p => (
              			<option key={p.id} value={p.id}>
							{p.name} ({p.brand})
              			</option>
            		))}
          		</select>
        	</label>	
			)}
			
			<p>Created: {project.created_at}</p>
			{project.updated_at && <p>Updated: {project.updated_at}</p>}
			<button className="delete_button" onClick={handleDelete}>Remove</button>
		</div>
	)
}