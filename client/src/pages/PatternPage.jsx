import { useState } from "react";
import { Link } from "react-router-dom"
import { CircleArrowLeft } from "lucide-react";
import PatternGallery from "../components/patterns/PatternGallery"
import AddPatternForm from "../components/patterns/AddPatternForm";

export default function PatternPage() {
	const [showPatForm, setShowPatForm] = useState(false);
	return (
	<div className="proj-container"> 
		<header className="proj-header">
				<Link className="go-back" to="/projects">
					<CircleArrowLeft color="#986f16" />
					{" "}Go back to Projects
				</Link>
				<button
					className="proj-card-btn" 
					onClick={() => setShowPatForm(true)}>
						+ Add New Pattern
				</button>
		</header>

		<h1>Patterns</h1>	

		{/* Add Pattern Modal */}
				{showPatForm && (
					<div className="modal-overlay"
						onClick={() => setShowPatForm(false)}>
							<span className="modal-content"
								onClick={(e) => e.stopPropagation()}>
								<AddPatternForm onClose={() => setShowPatForm(false)}/>
							</span>
					</div>
				)}

	  	<PatternGallery />
	</div>
  );
}