import { useState } from "react";
import PatternGallery from "../components/PatternGallery"
import AddPatternForm from "../components/AddPatternForm";

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