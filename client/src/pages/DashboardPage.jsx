import React from "react";
import StatsGallery from "../components/dashboard/StatsGallery";
import PatternReqs from "../components/dashboard/PatternReqs";
import { capitalizeWords } from "../utils/formatText";

export default function DashboardPage({user}) {
	return (
	<> 
	  <h1>{capitalizeWords(user?.display_name)}'s Dashboard</h1>
	  <StatsGallery />
	  <hr style={{margin:'40px'}}></hr>
	  <PatternReqs />
	</>
  );
}