import { useContext } from 'react'
import { ProjectContext } from '../context/ProjectContext';
import ProjectCard from '../components/projects/ProjectCard';
import empty_complete from '../assets/empty_complete.png'


export default function CompletedPage() {
	const statusKey = (s) =>
		(s || "").toLowerCase().trim().replace(/[_\s]+/g, "-");

	const {projects} = useContext(ProjectContext)

	const completed = projects.filter(p => p?.status === "complete" && p?.completed_at);

	// Days to complete project stat
	function getDaysToComplete(project) {
		const start = new Date(project?.created_at);
		const end = new Date(project?.completed_at);
		return Math.round((end - start) / (1000 * 60 * 60 * 24));
	}

	// Group completed projects by year
	const groupByYear = completed.slice()
		.sort((a,b) => new Date(b.completed_at) - new Date(a.completed_at))
		.reduce((acc, project) => {
			const year = new Date(project.completed_at).getFullYear();
			if (!acc[year]) {
				acc[year] = [];
			}
			acc[year].push(project);
			return acc;
		}, {});

	// Sort from most recent year
	const years = Object.keys(groupByYear).sort((a, b) => b - a);

	return (
		<>
		<h1>Finished Projects</h1>
		  {completed.length === 0 ? (
			<img className="empty-img" src={empty_complete} alt="No project images yet"/>
		  ): (
			years.map(year => (
				<section key={year} className="kanban-filter">
					<div className="kanban-filter-header">
						<h2 className="kanban-filter-title">{year}</h2>
						<hr className="kanban-filter-line" />
					</div>
					
					<div className="gallery">
						{groupByYear[year].map(project => (
							<div key={project.id} 
							className="gallery-item" 
							>
								<ProjectCard 
								project={project} 
								isCompleted={true}
								daysToComplete = {getDaysToComplete(project)}
								/>
							</div>
						))}
					</div>
				</section>
			))
		  )}
		</>
	  )
	}