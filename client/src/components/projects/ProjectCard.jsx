import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../context/ProjectContext";
import { capitalizeWords } from "../../utils/formatText";
import "../../styles/ProjectCard.css";


const statuses = [
		"planning", "cutting", "ready_to_sew", "sewing", "final_touches", "complete"
	];

export default function ProjectCard({project}) {
	const { updateProject } = useContext(ProjectContext);
	const p = project?.pattern;
	const patternId = p?.id ?? project?.pattern_id;

	async function handleStatusChange(e) {
		e.stopPropagation();
		await updateProject(project.id, {status: e.target.value});
	}

	async function handlePatternChange(e) {
		const newPattern = e.target.value ? Number(e.target.value) : null;
		await updateProject({pattern_id: newPattern});
	}

	return(
		<article className="project-card">

			<Link to={`/projects/${project.id}`} className="card_link" aria-label={`${project.title}`}>
				<div className="proj-card-body">

					{/* project title */}
					<h2 className="proj-card-title">
						{capitalizeWords(project.title)}
					</h2>

					{/* linked pattern */}
					<div className="proj-card-field">
						<span className="proj-card-label">Pattern</span>
						{patternId ?(
							<span>
								{`${p?.name} (${p?.brand})`}
							</span>
						):(
							<span className="proj-card-patt-none">"No pattern linked to project"</span>
						)}
					</div>	

					<hr className="proj-card-divider" />

					{/* project deadline */}
					<p className="proj-card-meta">
						Deadline: {project.deadline ?? "No deadline"}
					</p>	

				</div>				
			</Link>

			{/* status dropdown */}
			<div className="proj-card-field">
				<span className="proj-card-label">Status</span>
				<select 
					className="proj-card-select" 
					value={project?.status} 
					onChange={handleStatusChange}>
					
					{statuses.map(s => (
						<option key={s} value={s}>
							{s.replace(/_/g, " ")}
						</option>
					))}
				</select>
			</div>
			
		</article>
	)
}

