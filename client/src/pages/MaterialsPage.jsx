import PlanningMaterialsList from "../components/dashboard/PlanningMaterialsList"
import { Link } from "react-router-dom"
import { CircleArrowLeft } from "lucide-react";


export default function MaterialsPage() {
	return(
		<div>
			<header className="proj-header">
				<Link className="go-back" to="/">
					<CircleArrowLeft color="#986f16" />
					{" "}Go back to dashboard
				</Link>
		</header>
			<h1> 
				Planned Projects Materials List
			</h1>
			<PlanningMaterialsList />
		</div>
	)
}