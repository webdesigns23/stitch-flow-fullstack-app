// import { useContext, useMemo } from "react";
// import { ClipboardList } from "lucide-react";
// import { ProjectContext } from "../../context/ProjectContext";
// import { capitalizeWords } from "../../utils/formatText";

// export default function PlanningMaterialsList() {
//   const { projects } = useContext(ProjectContext);

//   const planningProjects = useMemo(
//     () => projects.filter(p => p?.status === "planning" && p?.pattern?.id),
//     [projects]
//   );

//   return (
//     <>
//       {planningProjects.length === 0 && <p>No projects in planning.</p>}

//       {planningProjects.map(project => {
//         const pattern = project.pattern;
//         const reqs = pattern?.pattern_requirements ?? [];

//         return (
//           <div key={project.id} className="pattern-details-card">
//             <span className="proj-details-label">
//             <ClipboardList size={20} color="#9f831d" />
//             {" "} {capitalizeWords(project.title)}
//           </span>
            
//             <div className="table" >
//               {reqs.length > 0 ? (
//                 <table className="req_table">
//                   <thead>
//                     <tr>
//                       <th>Role</th>
//                       <th>Material</th>
//                       <th>Qty</th>
//                       <th>Unit</th>
//                       <th>Size</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {reqs.map((r) => (
//                       <tr key={r.id}>
//                         <td>{r.role}</td>
//                         <td>{r.material_type}</td>
//                         <td>{r.quantity}</td>
//                         <td>{r.unit}</td>
//                         <td>{r.size}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               ) : (
//                 <p>No requirements found.</p>
//               )}
//             </div>
//           </div>
//         );
//       })}

//     </>
//   );
// }

import { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import {ClipboardList, CircleArrowRight, TriangleAlert} from "lucide-react";
import { ProjectContext } from "../../context/ProjectContext";
import { capitalizeWords } from "../../utils/formatText";

export default function PlanningMaterialsList() {
	const { projects = [] } = useContext(ProjectContext);

	const planningProjects = useMemo(
		() =>
			projects.filter(
				project =>
					project?.status === "planning" &&
					project?.pattern?.id
			),
		[projects]
	);

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
			<section className="materials-section">
				<div className="kanban-filter-header">
					<h2 className="materials-section-title">
						Planned Project Materials
					</h2>

					<div />
					<hr className="kanban-filter-line" />
				</div>
				<p className="missing-patterns-description">
					Summary of required materials for your fully planned projects.
				</p>

				{planningProjects.length === 0 ? (
					<p className="materials-empty">
						No planning projects have linked patterns yet.
					</p>
				) : (
					planningProjects.map(project => {
						const pattern = project.pattern;
						const reqs = pattern?.pattern_requirements ?? [];

						return (
							<article
								key={project.id}
								className="pattern-details-card"
							>
								<h3 className="proj-details-label">
									<ClipboardList
										size={20}
										color="#9f831d"
										aria-hidden="true"
									/>
									{capitalizeWords(project.title)}
								</h3>

								<div className="table">
									{reqs.length > 0 ? (
										<table className="req_table">
											<thead>
												<tr>
													<th>Role</th>
													<th>Material</th>
													<th>Qty</th>
													<th>Unit</th>
													<th>Size</th>
												</tr>
											</thead>

											<tbody>
												{reqs.map(requirement => (
													<tr key={requirement.id}>
														<td>{requirement.role}</td>
														<td>{requirement.material_type}</td>
														<td>{requirement.quantity}</td>
														<td>{requirement.unit}</td>
														<td>{requirement.size}</td>
													</tr>
												))}
											</tbody>
										</table>
									) : (
										<p>No requirements found.</p>
									)}
								</div>
							</article>
						);
					})
				)}
			</section>
		</div>
	);
}