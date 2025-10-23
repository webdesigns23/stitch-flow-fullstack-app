import React from "react";
import StatsGallery from "../components/StatsGallery";
import PatternReqs from "../components/PatternReqs";

export default function DashboardPage() {
	return (
	<> 
	  <h1>Stitch Flow Dashboard</h1>
	  <StatsGallery />
	  <PatternReqs />
	</>
  );
}