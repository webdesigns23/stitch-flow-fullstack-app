import StatusPieChart from "./StatusPieChart"
import { CircleCheckBig, Clock, CalendarX2, CirclePlus } from "lucide-react"
import { Link } from "react-router-dom";
import { NotebookText, } from "lucide-react"
import { capitalizeWords }from "../../utils/formatText"
import { formatDate } from "../../utils/dateTime";
import DashboardCompleted from "./DashboardCompleted";
import AddProjectForm from "../projects/AddProjectForm";
import AddPatternForm from "../patterns/AddPatternForm";
import { useState } from "react";


export default function DashboardAtGlance({activeProjects, isOverdue, isDueSoon, daysOverdue, daysUntilDue, projects, patterns}) {
	const [showProjForm, setShowProjForm] = useState(false);
	const [showPatForm, setShowPatForm] = useState(false);

	const overdueProjects = activeProjects
		.filter(p => isOverdue(p.deadline))
		.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
	
	const dueSoonProjects = activeProjects
		.filter(p => isDueSoon(p.deadline))
		.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

	return (
		<div className="stat-gallery-item is-glance">

			{/* overdue/duesoon/complete stats */}
			<div className="glance-container">
				<h2 className="dashboard-title">
					At a Glance
				</h2>
				<div className="glance-content">
					
					{/*Overdue Projects with list */}
					<div className="stat-gallery-overdue">
						<CalendarX2 size={30} color="#d47052"/>

						<div className="completed-info">
							<span className="stat-value">{overdueProjects.length}</span>
							<p className="totals-footer">Overdue</p>
						</div>
				
					</div>

					{/*Due within 7 days with list */}
					<div className="stat-gallery-due-soon">
						<Clock size={30} color="#bb9715"/>

						<div className="completed-info">
							<span className="stat-value">{dueSoonProjects.length}</span>
							<p className="totals-footer">Due Soon<br></br>(next 7 days)</p>
						</div>

					</div>
						
					{/* Completed this month and all time */}
					<div>
						<DashboardCompleted 
							projects={projects}/>
					</div>
				</div>
			</div>

			{/* quick actions buttons */}
			<div className="actions-container">
				<h2 className="dashboard-title"> Quick Actions</h2>
				<div className="quick-actions">

					<button
						type="button"
						className="quick-action-card" 
						onClick={() => setShowProjForm(true)}
					>
						<CirclePlus 
							size={28}
							className="quick-action-icon"
							aria-hidden="true"
						/>
						<div className="quick-action-content">
							<h3 className="quick-action-title">Add Project</h3>
							<p className="quick-action-description">Start a New Sewing Project</p>
						</div>
					</button>
					<button
						type="button"
						className="quick-action-card" 
						onClick={() => setShowPatForm(true)}
					>
						<CirclePlus 
							size={28}
							className="quick-action-icon"
							aria-hidden="true"
						/>
						<div className="quick-action-content">
							<h3 className="quick-action-title">Add Pattern</h3>
							<p className="quick-action-description">Save a Pattern to your Library</p>
						</div>							
					</button>
				</div>
			</div>
			
			{/* Add Project modal */}
			{showProjForm && (
				<div
					className="modal-overlay"
					onClick={() => setShowProjForm(false)}
				>
					<div
						className="modal-content"
						role="dialog"
						aria-modal="true"
						aria-label="Add new project"
						onClick={(e) => e.stopPropagation()}
					>
						<AddProjectForm
							onClose={() => setShowProjForm(false)}
						/>
					</div>
				</div>
			)}

			{/* Add Pattern modal */}
			{showPatForm && (
				<div
					className="modal-overlay"
					onClick={() => setShowPatForm(false)}
				>
					<div
						className="modal-content"
						role="dialog"
						aria-modal="true"
						aria-label="Add new pattern"
						onClick={(e) => e.stopPropagation()}
					>
						<AddPatternForm
							onClose={() => setShowPatForm(false)}
						/>
					</div>
				</div>
			)}



		</div>
	)
}

				