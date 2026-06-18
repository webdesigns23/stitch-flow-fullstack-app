import { useContext, useEffect, useState  } from "react";
import { Link, useParams, useNavigate} from "react-router-dom";
import { CircleArrowLeft, Tag, Hash, Folder } from "lucide-react";
import { PatternContext } from "../context/PatternContext";
import { fetchPatternById } from "../api/patterns";
import { capitalizeWords } from "../utils/formatText";
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

	return (
		<>
			<header className="proj-header">
				<Link className="go-back" to="/patterns">
					<CircleArrowLeft color="#986f16" />
					{" "} Back to All Patterns
				</Link>

				<button className="proj-card-btn-remove"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						handleDelete();
					}}>
					Delete Pattern
				</button>
			</header>
			<main className="pat-details">

				<h1>{capitalizeWords(pattern.name)}</h1>
				
				<div className="pat-meta-row">
					<span className="pat-meta-item">
						<Tag size={16}/>
						{pattern.brand}
					</span>
				
					<span className="pat-meta-item">
						<Hash size={16}/>
						{pattern.pattern_number}
					</span>
					<span className="pat-meta-item">
						<Folder size={16}/>
						{pattern.category}
					</span>
				</div>
				<p>{pattern.notes ?
					 pattern.notes : 
					 "No Notes"}
				</p>
			</main>

			<button className="proj-card-btn" onClick={() => setEditing(true)}>
				Edit Pattern Details
			</button>

			{editing && (
				<div className="modal-overlay" onClick={() => setEditing(false)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<EditPatternForm
							pattern={pattern}
							onClose={() => setEditing(false)}
							handlePatternUpdated={handlePatternUpdated} />
					</div>
				</div>
			)}

			{/* Pattern Requirements Info */}
			<ReqDetails pattern={pattern} />
		</>
	)
}