import React from "react";
import PatternGallery from "../components/PatternFeature/PatternGallery";
import AddPatternForm from "../components/PatternFeature/AddPatternForm";

export default function PatternPage() {
	return (
	<> 
		<h1>Patterns</h1>	
		<AddPatternForm />
	  	<PatternGallery />
	</>
  );
}