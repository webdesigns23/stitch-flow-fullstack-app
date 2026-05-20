
export default function StatusFilter({statusFilter, onChange}) {
	return (
		<>
		<br></br>
			<label style={{color: "rgb(63, 61, 61)"}}>
				<input
					type="radio"
					name = "filter-status"
					value = "all"
					checked={statusFilter === "all"}
					onChange={(e) => onChange(e.target.value)}/> All Projects
			</label>
			<label style={{color: "rgb(199, 140, 150)"}}>
				<input
					type="radio"
					name = "filter-status"
					value = "planning"
					checked={statusFilter === "planning"}
					onChange={(e) => onChange(e.target.value)}/> Planning
			</label>
			<label style={{color: "rgb(47, 116, 78)"}}>
				<input
					type="radio"
					name = "filter-status"
					value = "ready_to_sew"
					checked={statusFilter === "ready_to_sew"}
					onChange={(e) => onChange(e.target.value)}/> Ready to Sew
			</label>
			<label style={{color: "rgb(45, 114, 160)"}}>
				<input
					type="radio"
					name = "filter-status"
					value = "cutting"
					checked={statusFilter === "cutting"}
					onChange={(e) => onChange(e.target.value)}/> Cutting
			</label>
			<label style={{color: "rgb(110, 94, 141)"}}>
				<input
					type="radio"
					name = "filter-status"
					value = "sewing"
					checked={statusFilter === "sewing"}
					onChange={(e) => onChange(e.target.value)}/> Sewing
			</label>
			<label style={{color:"rgb(161, 155, 58)"}}>
				<input
					type="radio"
					name = "filter-status"
					value = "final_touches"
					checked={statusFilter === "final_touches"}
					onChange={(e) => onChange(e.target.value)}/> Final Touches
			</label>
		</>
	)
}