import { useState } from "react";
import PatternGallery from "../components/PatternFeature/PatternGallery";
import AddPatternForm from "../components/PatternFeature/AddPatternForm";

export default function PatternPage() {
	const [showPatForm, setShowPatForm] = useState(false);
	return (
	<> 
		<h1>Patterns</h1>	

		<button onClick={() => setShowPatForm(!showPatForm)}>
			{showPatForm ? "Exit Pattern Form" : "+ Add New Pattern"}
		</button>

		{ showPatForm && <AddPatternForm />}
	  	<PatternGallery />
	</>
  );
}