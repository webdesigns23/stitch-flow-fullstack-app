import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { CircleArrowRight, Lightbulb } from "lucide-react";
import { ProjectContext } from "../../context/ProjectContext";
import { capitalizeWords } from "../../utils/formatText";

export default function PatternPlanning() {
	const { projects = [] } = useContext(ProjectContext);

	const projectsMissingPatterns = useMemo(
		() =>
			projects.filter(
				project =>
					project?.status === "planning" &&
					!project?.pattern?.id
			),
		[projects]
	);

	return (
		<div className="gather">
			<div className="kanban-filter-header">
				<h2 className="materials-section-title">
					Pattern Planning
				</h2>
				<div />
				<hr className="kanban-filter-line" />
			</div>

			<p className="missing-patterns-description">
				Projects missing a pattern.  Click <strong>View Project</strong> to check specs and link the right pattern."
			</p>

			<section className="missing-patterns-section">
				{projectsMissingPatterns.length > 0 ? (
					<ul className="missing-patterns-list">
						{projectsMissingPatterns.map(project => (
							<li
								key={project.id}
								className="missing-patterns-item"
							>
								<h3 className="missing-pattern-project-title">
									{capitalizeWords(project.title)}
								</h3>

								<Link
									to={`/projects/${project.id}`}
									className="go-link"
								>
									View Project
									<CircleArrowRight size={16} />
								</Link>
							</li>
						))}
					</ul>
				) : (
					<p className="materials-success">
						All planning projects have linked patterns.
					</p>
				)}
			</section>
		</div>
	);
}