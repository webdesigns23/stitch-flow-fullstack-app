import React from "react";
import StatsGallery from "../components/dashboard/StatsGallery";
import { capitalizeWords } from "../utils/formatText";
import { getGreeting } from "../utils/dateTime";

export default function DashboardPage({user}) {
	return (
	<> 
	  <h2>{getGreeting()}, {capitalizeWords(user?.display_name)}</h2>
	  <hr className="kanban-filter-line" />
	  <StatsGallery />
	</>
  );
}