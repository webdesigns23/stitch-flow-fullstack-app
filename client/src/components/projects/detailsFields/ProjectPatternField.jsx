import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PatternContext } from "../../../context/PatternContext";
import { PencilLine } from "lucide-react"

export default function ProjectPatternField({ project, onUpdate }) {
	const { patterns, loading: patternLoading } = useContext(PatternContext);

	const [editingPattern, setEditingPattern] = useState(false);
	const [patternSearch, setPatternSearch] = useState("");

	//For Pattern List Dropdown
	const p = project?.pattern;
	const patternId = p?.id ?? project?.pattern_id;

	//Edit Pattern with Search Pattern Functionality
	async function handlePatternChange(selectedId) {
		await onUpdate({
			pattern_id: selectedId ? Number(selectedId): null});
		setEditingPattern(false);
		setPatternSearch("");
	}

	return (
		<div className="proj-card-field">
			<span className="proj-card-label">
				<PencilLine size={14} color="#9f831d" onClick={() => setEditingPattern(true)} style={{ cursor: "pointer" }} />
				{" "} Pattern
			</span>
			{editingPattern ? (
				<div>
					<input
						type="text"
						placeholder="Search patterns..."
						value={patternSearch}
						onChange={(e) => setPatternSearch(e.target.value)}
						autoFocus
					/>
					<ul className="proj-pat-list">
						<li onClick={() => handlePatternChange(null)} style={{ cursor: "pointer" }}>
							No pattern linked
						</li>
						{patterns
							.filter(pat =>
								pat.name.toLowerCase().includes(patternSearch.toLowerCase()) ||
								pat.brand.toLowerCase().includes(patternSearch.toLowerCase())
							)
							.map(pat => (
								<li
									key={pat.id}
									onClick={() => handlePatternChange(pat.id)} style={{ cursor: "pointer" }}>
									{pat.name} ({pat.brand})
								</li>
							))
						}
					</ul>
					<Link to="/patterns" className="proj-card-patt-link">
						Don't see your pattern? Add it on the Patterns page
					</Link>
					<button
						className="proj-card-btn-remove"
						onClick={() => setEditingPattern(false)}>Cancel</button>
				</div>
			) : (
				<span>
					{patternId && (
						<Link to={`/patterns/${patternId}`} className="proj-card-patt-link">
							{patternId ? `${p?.name} (${p?.brand})` : "No pattern linked"}
						</Link>
					)}
				</span>
			)}
		</div>
	)
}