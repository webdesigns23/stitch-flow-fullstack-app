import { useState } from "react"
import ProjectCard from "./ProjectCard";
import "../../styles/ProjectKanban.css";

const STATUSES = [
	{ key: "planning", label: "Planning" },
	{ key: "cutting", label: "Cutting" },
	{ key: "ready_to_sew", label: "Ready to Sew" },
	{ key: "sewing", label: "Sewing" },
	{ key: "final_touches", label: "Final Touches" },
];

const MONTH_NAMES = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December"
];

export default function ProjectKanban({ projects }) {
	const [ searchProjects, setSearchProjects ] = useState("");

	//Search projects by title
	const query = searchProjects.toLowerCase();

	const filteredProjects = projects.filter(p => 
		p.title.toLowerCase().includes(query)
	);

	//Group filtered projects into sections by month
	const monthSections = {};
	filteredProjects.forEach(project => {
		const [month, day, year] = project.deadline.split("/");
		const key = `${year}-${month}`;
		if (!monthSections[key]) monthSections[key] = [];
		monthSections[key].push(project);
	});

	//Sort section keys in order
	const monthKeys = Object.keys(monthSections).sort();

	if (!projects.length) {
		return <div className="kanban-empty"><p>No active projects. Add one to get started!</p></div>;
	}

	return (
		<>
		<div className="toolbar">
			{/* Search bar */}
				<div className='search-bar'>
					<label>Search Projects: 
						<input
							type="text"
							placeholder="Search by project title"
							value={searchProjects}
							onChange={(e) => setSearchProjects(e.target.value)} 
						/>
					</label>
				</div>

				{/* Month Filter Nav Bar and Pills*/}
				<div className="kanban-month-filter-nav">
				{monthKeys.map(key => {
					const [year, month] = key.split("-");
					const monthIndex = parseInt(month) - 1;

					return (
						<a 
							key={key} 
							href={`#month-${key}`}
							className="kanban-month-filter-pill">
							{MONTH_NAMES[monthIndex]} {year}
						</a>
					);				
				})}
				</div>
			</div>

			<div className="kanban-board">
				{/* Month Sections */}
				{monthKeys.map(key => {
					const [year, month] = key.split("-");
					const monthIndex = parseInt(month) - 1;
					const monthProjects = monthSections[key];

					return (
						<section 
							key={key} 
							id={`month-${key}`} 
							className="kanban-month"
						>
							<div className="kanban-month-header">
								<h2 className="kanban-month-title">
									{MONTH_NAMES[monthIndex]}
								</h2>
								<div />
								<hr className="kanban-month-line" />
							</div>
							
							{/* Kanban Column headings (statuses) */}
							<div className="kanban-columns">
								{STATUSES.map(({ key: statusKey, label }) => {
									const cards = monthProjects.filter(p => p.status === statusKey);
									return (
										<div key={statusKey} className="kanban-column">
											<div className={`kanban-column-head kanban-column-head--${statusKey}`}>
												<span className="kanban-column-label">
													{label} ({cards.length})
												</span>
											</div>

											{/* Kanban Project Cards */}
											<div className="kanban-column-body">
												{cards.length === 0 ? (
													<div>-</div>
												) : (
													cards.map(project => (
													<ProjectCard key={project.id} project={project} />
													))
												)}
											</div>
										</div>
									);
								})}
							</div>
						</section>
					);
				})}
			</div>
		</>
	);
}