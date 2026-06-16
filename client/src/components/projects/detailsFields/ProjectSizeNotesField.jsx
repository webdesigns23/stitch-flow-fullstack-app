import { useEffect, useState, useRef } from "react";
import { PencilRuler, SquarePen } from "lucide-react"

export default function ProjectSizeNotesField({project, onUpdate}) {
	const [ editingSize, setEditingSize ] = useState(false);
	const [ sizeValue, setSizeValue ] = useState("");
	
	const textareaRef = useRef(null);

	// To position cursor after a bullet on open editing
	useEffect(() => {
		if (editingSize && textareaRef.current) {
			const len = textareaRef.current.value.length;
			textareaRef.current.focus();
			textareaRef.current.setSelectionRange(len, len);
		}
	}, [editingSize]);

	// Initialize inline edit values after data loads
	useEffect(() => {
		setSizeValue(project.measurement_notes || "");
	}, [project]);
				
	// Size notes
	async function handleSizeSave() {
		await onUpdate({ measurement_notes: sizeValue.trim() || null });
		setEditingSize(false);
	};

	// Add a bullet when editing and "Enter" pressed
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			const { selectionStart, selectionEnd } = e.target;
			const newValue = sizeValue.substring(0, selectionStart) + 
				"\n• " + 
				sizeValue.substring(selectionEnd);
			
			setSizeValue(newValue);
			requestAnimationFrame(() => {
				e.target.selectionStart = selectionStart + 3;
				e.target.selectionEnd = selectionStart + 3;
			});
		}
	}


	return (
		<>
			{/* Size(measurement) notes */}
			<div className="proj-details-field">
				<span className="proj-details-label">
					<PencilRuler 
						size={20} 
						color="#9f831d" 
						onClick={() => setEditingSize(true)} style={{ cursor: "pointer" }} 
					/> {" "} Size
				</span>
				{editingSize ? (
					<div>
						<textarea
							ref={textareaRef}
							className="notes-textarea"
							value={sizeValue}
							className="notes-textarea"
							onChange={(e) => setSizeValue(e.target.value)}
							onKeyDown={handleKeyDown}
							maxLength={100}
							rows={5}
							autoFocus
						/>
						<button
							className="proj-card-btn-remove"
							onClick={handleSizeSave}>
							Save
						</button>
						<button
							className="proj-card-btn-remove"
							onClick={() => setEditingSize(false)}>
							Cancel
						</button>
					</div>
				) : (
					<p>{project.measurement_notes || "-"}</p>
				)}
			</div>
		</>
	)
}