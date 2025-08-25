import React from "react";
import StatsGallery from "../components/DashboardFeature/StatsGallery";
import PatternReqs from "../components/DashboardFeature/PatternReqs";

export default function DashboardPage() {
	return (
	<> 
	  <h1>Stitch Flow Dashboard</h1>
	  <StatsGallery />
	  <PatternReqs />
	</>
  );
}