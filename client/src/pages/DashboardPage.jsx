import React from "react";
import StatsGallery from "../components/dashboard/StatsGallery";
import PatternReqs from "../components/dashboard/PatternReqs";

export default function DashboardPage() {
	return (
	<> 
	  <h1>Stitch Flow Dashboard</h1>
	  <StatsGallery />
	  <PatternReqs />
	</>
  );
}