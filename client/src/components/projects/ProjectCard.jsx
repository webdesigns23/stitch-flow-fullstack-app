import { Link } from "react-router-dom"
import { useContext, useState } from "react";
import { PatternContext } from "../../context/PatternContext"
import "../../styles/ProjectCard.css"

export default function ProjectCard({project, handleDelete, updateProject}) {
	const [ showChangePat, setShowChangePat ] = useState(false);
	const { patterns, loading: patternLoading } = useContext(PatternContext);

	const p = project?.pattern;
	const patternId = p?.id ?? project?.pattern_id;

	const statuses = [
		"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"];

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

			<div className="proj-card-body">
				<h2 className="proj-card-title">{project.title.toUpperCase()}</h2>

				{/* status dropdown */}
				<div className="proj-card-field">
					<span className="proj-card-label">Status</span>
					<select className="proj-card-select" value={project?.status} onChange={handleStatusChange}>
						{statuses.map(s => (
							<option key={s} value={s}>
								{s.replace(/_/g, " ")}
							</option>
						))}
					</select>
				</div>

				{/* linked pattern */}
				<div className="proj-card-field">
					<span className="proj-card-label">Pattern</span>
					{patternId ?(
					<Link className="proj-card-patt-link" 
						to={`/patterns/${patternId}`}>
						{`${p?.name} (${p?.brand})`}
					</Link>
					):(
						<span className="proj-card-patt-none">"No pattern linked to project"</span>
					)}
				</div>		

				<hr className="proj-card-divider" />

				{/* project notes */}
				<div className="proj-card-field">
					<span className="proj-card-label">Notes</span>
					<p className="proj-card-notes">{project.notes || "-"}</p>
				</div>
				

				{/* date created/updated */}
				<p className="proj-card-meta">Created: {project.created_at}</p>
				{project.updated_at && <p className="proj-card-meta">Updated: {project.updated_at}</p>}
			</div>

			{/* change pattern panel */}
			{showChangePat && !patternLoading && (
				<div className="proj-card-chang-pat">
					<span>Change Pattern:</span>
					<select className="proj-card-select" value={patternId ?? ""} onChange={handlePatternChange}>
						<option value= "none">No Pattern Linked</option>
						{patterns.map(p => (
							<option key={p.id} value={p.id}>
								{p.name} ({p.brand})
							</option>
						))}
					</select>
				</div>	
				)}
				
			<div className="proj-card-footer">
				{/* change pattern */}
				<button className="proj-card-btn" 
					onClick={() => setShowChangePat(prevState => !prevState)}>
					{showChangePat ? "Cancel" : "Change Pattern"}
				</button>

				
				{/*Buttons for delete and update pattern*/}
				<button className="proj-card-btn-remove" onClick={handleDelete}>
					Remove Pattern
				</button>
			</div>

		</div>
	)
}

