import MaterialsList from "../components/dashboard/MaterialsList"
import PatternPlanning from "../components/dashboard/PatternPlanning";
import { Link } from "react-router-dom"
import { CircleArrowLeft, Lightbulb } from "lucide-react";


export default function MaterialsPage() {
	return(
		<div>
			<header className="proj-header">
				<Link className="go-back" to="/">
					<CircleArrowLeft color="#986f16" />
					{" "}Go back to dashboard
				</Link>
			</header>
			
			<h1>Gather Materials</h1>
			<p>Plan your projects and collect everything you need before you start sewing.</p>

			<PatternPlanning />
			<MaterialsList />

		</div>
	)
}