import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function ReqDetails({pattern}) {
	const { id } = useParams();

	const [ requirements, setRequirements ] = useState(null)
	const [ reqLoading, setReqLoading ] = useState(false);
	const [ reqError, setReqError ] = useState(null)
	
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

	if (reqLoading) return <p>Loading pattern details...</p>
	if (reqError || !pattern) return <p>Error: {patError || "Pattern not found"}</p>
	
	
	return (
		<div>
			<h2>{`${pattern.name}`} requirements:</h2>

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
	)
}