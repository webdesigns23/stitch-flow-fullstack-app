import React from "react";
import StatsGallery from "../components/dashboard/StatsGallery";
import PatternReqs from "../components/dashboard/PatternReqs";

export default function DashboardPage({user}) {
	return (
	<> 
	  <h1>{user?.username?.charAt(0).toUpperCase() + user?.username?.slice(1)}'s Dashboard</h1>
	  <StatsGallery />
	  <PatternReqs />
	</>
  );
}