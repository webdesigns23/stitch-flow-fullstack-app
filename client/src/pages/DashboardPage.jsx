import React from "react";
import StatsGallery from "../components/dashboard/StatsGallery";
import { capitalizeWords } from "../utils/formatText";

export default function DashboardPage({user}) {
	return (
	<> 
	  <h1>{capitalizeWords(user?.display_name)}'s Dashboard</h1>
	  <StatsGallery />
	</>
  );
}