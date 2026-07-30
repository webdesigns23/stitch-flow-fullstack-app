import React from "react";
import StatsGallery from "../components/dashboard/StatsGallery";
import { capitalizeWords } from "../utils/formatText";
import { getGreeting } from "../utils/dateTime";

export default function DashboardPage({user}) {
	return (
	<> 
		<header className="proj-header">
				<h1>{getGreeting()}, {capitalizeWords(user?.display_name)}</h1>
				<button
					className="proj-card-btn" 
					onClick={() => setShowProjForm(true)}>
						+ New Project
				</button>
		</header>
	  
	  <hr className="kanban-filter-line" />
	  <StatsGallery />
	</>
  );
}