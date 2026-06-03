import { useContext, useEffect, useState  } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import { PatternContext } from "../context/PatternContext";
import { fetchPatternById } from "../api/patterns";
import ReqDetails from "../components/patterns/ReqDetails";
import EditPatternForm from "../components/patterns/EditPatternForm";

export default function PatternDetails() {
	const { patterns, deletePattern } = useContext(PatternContext);
	const { id } = useParams();

	const [ pattern, setPattern ] = useState(null);
	const [ patLoading, setPatLoading ] = useState(true);
	const [ patError, setPatError ] = useState(null);
	const [ editing, setEditing] = useState(false);

	const navigate = useNavigate();

	function handleDelete() {
		deletePattern(pattern.id);
		navigate("/patterns");
	};

	//Lists Pattern Details By Id
		useEffect(() => {
			const loadPatternDetails = async() => {
				setPatLoading(true);
				setPatError(null);
				try{
					const data = await fetchPatternById(id);
					setPattern(data);
				} catch (error){
					setPatError("Error loading pattern data");
				}finally{
					setPatLoading(false);
				}
			};
			loadPatternDetails()
		}, [id, patterns]) 
	
	if (patLoading) return <p>Loading pattern details...</p>
	if (patError || !pattern) return <p>Error: {patError || "Pattern not found"}</p>

	//Update Function
	function handlePatternUpdated(updated) {
		if (updated) {
			setPattern(updated);
		} setEditing(false);
	}
	
	return(
		<>
			<p>
				<Link to="/patterns">Back to All Patterns</Link><br></br>
				<Link to="/projects">Back to All Projects</Link>
			</p>
			
			<h1>{pattern.name}</h1>
			<div className="grid">
			<p><strong>Brand:</strong> {pattern.brand}</p>
			<p><strong>Pattern #:</strong> {pattern.pattern_number}</p>
			<p><strong>Category:</strong> {pattern.category}</p>
			</div>

			{pattern.notes && (
				<p><strong>Notes:</strong> {pattern.notes}</p>
			)}
			<ReqDetails pattern={pattern}/>

			<button onClick={() => setEditing(!editing)}>
				{editing ? "Exit Editing Mode" : "Edit Pattern"}
			</button>
			{editing && (
				<EditPatternForm 
			pattern={pattern}
			handlePatternUpdated={handlePatternUpdated}/>
			)}

			{/* delete button */}
			{pattern && (
				<button className="delete_button" 
				onClick={(e) => { 
					e.preventDefault(); 
					e.stopPropagation(); 
					handleDelete();}}>
				Delete Pattern
				</button>
			)}

		</>
	)
}