import { useEffect, useState, useRef} from "react";
import { SquarePen } from "lucide-react"

export default function ProjectNotesField({project, onUpdate}) {
	const [ editingNotes, setEditingNotes ] = useState(false);
	const [ notesValue, setNotesValue ] = useState("");

	const textareaRef = useRef(null);

	// Initialize inline edit values after data loads
	useEffect(() => {
		setNotesValue(project.notes || "");
	}, [project]);

	// To start editing notes
	function handleEditStart() {
		if (!notesValue) setNotesValue("• ");
		setEditingNotes(true);
	}
				
	// To position cursor after a bullet on open editing
	useEffect(() => {
		if (editingNotes && textareaRef.current) {
			const len = textareaRef.current.value.length;
			textareaRef.current.focus();
			textareaRef.current.setSelectionRange(len, len);
		}
	}, [editingNotes]);

	// Add a bullet when editing and "Enter" pressed
	function handleKeyDown(e) {
		if (e.key === "Enter") {
			e.preventDefault();
			const { selectionStart, selectionEnd } = e.target;
			const newValue = notesValue.substring(0, selectionStart) + 
				"\n• " + 
				notesValue.substring(selectionEnd);
			
			setNotesValue(newValue);
			requestAnimationFrame(() => {
				e.target.selectionStart = selectionStart + 3;
				e.target.selectionEnd = selectionStart + 3;
			});
		}
	}

	// Notes Save
	async function handleNotesSave() {
		await onUpdate({ notes: notesValue.trim() || null });
		setEditingNotes(false);
	};

	// Notes Edit Cancel
	function handleCancel() {
		setNotesValue(project.notes || "");
		setEditingNotes(false);
	}
		
	return (
		<>
			{/* notes */}
			<div className="proj-details-field">
				<span className="proj-details-label">
					<SquarePen 
						size={20} 
						color="#9f831d" 
						onClick={handleEditStart} 
						style={{ cursor: "pointer" }} 
					/>
					{" "} Notes
				</span>

				{/* Editing notes opened */}
				{editingNotes ? (
					<div>
						<textarea
							ref={textareaRef}
							className="notes-textarea"
							value={notesValue}
							onChange={(e) => setNotesValue(e.target.value)}
							onKeyDown={handleKeyDown}
							maxLength={500}
							rows={8}
						/>
						<div className="notes-actions">
							<button
								className="proj-card-btn-remove"
								onClick={handleNotesSave}>
								Save Notes
							</button>
							<button
								className="proj-card-btn-remove"
								onClick={handleCancel}>
								Cancel
							</button>
						</div>
					</div>
				) : (
					<p className="notes-display">
						{project.notes || "-"}
					</p>
				)}
			</div>
		</>
	)
}