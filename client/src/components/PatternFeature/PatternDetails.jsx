import { useEffect, useState, useContext } from "react";
import { useParams, Link} from "react-router-dom";
import { PatternContext } from "../../context/PatternContext";

export default function PatternDetails() {
	const { patterns } = useContext(PatternContext);
	const { id } = useParams();

	const [ pattern, setPattern ] = useState(null);
	const [ patLoading, setPatLoading ] = useState(true);
	const [ patError, setPatError ] = useState(null);

	const [ requirements, setRequirements ] = useState(null)
	const [ reqLoading, setReqLoading ] = useState(false);
	const [ reqError, setReqError ] = useState(null)


	//Lists Pattern Details By Id
		useEffect(() => {
			const LoadPatternDetails = async() => {
				setPatLoading(true);
				setPatError(null);
			try{
				const response = await fetch(`http://127.0.0.1:5555/patterns/${id}`)
				if (!response.ok) {
				throw new Error(`HTTP error!: ${response.status}`);
				}
				const data = await response.json();
				setPattern(data);
			} catch (error){
				setPatError("Error loading pattern data" || error);
			}finally{
				setPatLoading(false);
			}
			};
			LoadPatternDetails()
		}, [id, patterns]) 
	

	//Lists Requirements 
	useEffect(() => {
		const LoadPattReq = async() => {
			setReqLoading(true);
			setReqError(null);
		try{
			const response = await fetch(`http://127.0.0.1:5555/patterns/${id}/requirements`)
			if (!response.ok) {throw new Error(`HTTP error!: ${response.status}`);}
			const data = await response.json();
			setRequirements(Array.isArray(data) ? data : []);
		} catch (error){
			setReqError("Error loading pattern requirments data" || error);
		}finally{
			setReqLoading(false);
		}
		};
		LoadPattReq()
	}, [id])
	
	
	if (patLoading) return <p>Loading pattern details...</p>
	if (patError || !pattern) return <p>Error: {error} || "Pattern not found"</p>
	
	return(
		<>
			<p>
				<Link to="/patterns">Back to All Patterns</Link>
				<br></br>
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
			<div>
				<h2>{`${pattern.name}`} requirements:</h2>
				{reqLoading && <p>Loading pattern requirements...</p>}
				{reqError && <p>Error loading pattern requirements...</p>}
				
				{requirements && requirements.length > 0 ? (
				<div className="table">
				<table className="req_table">
					<thead>
						<tr>
							<th>Role</th>
							<th>Material Type</th>
							<th>Quantity</th>
							<th>Unit</th>
							<th>Size</th>
						</tr>
					</thead>
					<tbody>
						{requirements.map((r) => (
							<tr key={r.id}>
							<td>{r.role}</td>
							<td>{r.material_type}</td>
							<td>{r.quantity}</td>
							<td>{r.unit}</td>
							<td>{r.size}</td>
							</tr>
						))}
					</tbody>
				</table>
				</div>
				): (
				<p>No Requirements</p>
				)}
			</div>		
		</>
	)
}