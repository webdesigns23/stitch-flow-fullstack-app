import React from "react";
import StatsGallery from "../components/dashboard/StatsGallery";
import { capitalizeWords } from "../utils/formatText";
import { getGreeting } from "../utils/dateTime";

export default function DashboardPage({user}) {
	return (
	<> 
		<header className="proj-header">
			<h1>{getGreeting()}, {capitalizeWords(user?.display_name)}</h1>
		</header>
	  
	  <hr className="kanban-filter-line" />
	  <StatsGallery />
	</>
  );
}