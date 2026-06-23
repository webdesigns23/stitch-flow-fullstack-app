import { useEffect, useState } from "react";
import { ClipboardList } from "lucide-react";
import { useParams } from "react-router-dom";
import { fetchPatternReqs } from "../../api/patterns";


export default function ReqDetails({pattern}) {
	const { id } = useParams();

	const [ requirements, setRequirements ] = useState(null)
	const [ reqLoading, setReqLoading ] = useState(false);
	const [ reqError, setReqError ] = useState(null)
	
	//Lists Requirements 
	useEffect(() => {
		async function LoadPattReq() {
			setReqLoading(true);
			setReqError(null);
		try{
			const data = await fetchPatternReqs(id);
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
	if (reqError || !pattern) return <p>Error: {reqError || "Pattern not found"}</p>
	
	
	return (
		<div className="pattern-details-card">
			<span className="proj-details-label">
				<ClipboardList size={20} color="#9f831d" />
				{" "} Material Requirements
			</span>

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