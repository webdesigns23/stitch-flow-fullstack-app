import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { capitalizeWords } from "../../../utils/formatText"
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
			pattern_id: selectedId ? Number(selectedId) : null
		});
		setEditingPattern(false);
		setPatternSearch("");
	}

	return (
		<div className="proj-details-field">
			<span title="Click to Edit" className="proj-details-label">
				<PencilLine
					size={20}
					color="#9f831d"
					onClick={() => setEditingPattern(true)}
					style={{ cursor: "pointer" }}
				/>
				{" "} Pattern
			</span>

			{editingPattern ? (
				<div className="proj-pattern-edit">
					<input
						type="text"
						placeholder="Search pattern by name, brand ..."
						value={patternSearch}
						onChange={(e) => setPatternSearch(e.target.value)}
						autoFocus
					/>
					<div className="proj-pat-list">
						<ul >
							<li onClick={() => handlePatternChange(null)} style={{ cursor: "pointer", color: "#dd586a", fontWeight: "bold" }}>
								NO PATTERN
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
										{capitalizeWords(pat?.name)} ({pat?.brand})
									</li>
								))
							}
						</ul>
						<div>
							<button
							className="proj-card-btn-remove"
							onClick={() => setEditingPattern(false)}>
							Cancel Edit
							</button>
						</div>

						<Link to="/patterns" className="proj-card-pat-link">
							Don't see your pattern? Add it on the Patterns page
						</Link>
					</div>
				</div>
			) : (
				<div className="proj-pat-link">
					{patternId ? (
						<Link to={`/patterns/${patternId}`} >
							{capitalizeWords(p?.name)} ({p?.brand})
						</Link>
					) : (
						<span className="proj-card-none">
							No pattern linked
							<p>Click icon to add/update pattern </p>
						</span>
					)}
				</div>
			)}
		</div>
	)
}