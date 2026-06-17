import { useEffect, useState, useRef } from "react"

export function useBulletedTextField({initialValue, useBullets=true, onSave}){
	const [ editing, setEditing ] = useState(false);
	const [ value, setValue ] = useState(initialValue || "");
	
	const textAreaRef = useRef(null);

	// To position cursor after a bullet on open editing
	useEffect(() => {
		if (editing && textAreaRef.current) {
			const len = textAreaRef.current.value.length;
			textAreaRef.current.focus();
			textAreaRef.current.setSelectionRange(len, len);
		}
	}, [editing]);

	// Add bullet when start editing a note field that's empty
	function startEditing() {
		if (useBullets && !value) setValue("• ");
		setEditing(true);
	}

	// Add a bullet when editing and "Enter" pressed
	function handleKeyDown(e) {
		if (!useBullets || e.key !== "Enter") return;
		
		e.preventDefault();

		const { selectionStart, selectionEnd } = e.target;
		const newValue = value.substring(0, selectionStart) + 
			"\n• " + 
			value.substring(selectionEnd);
		setValue(newValue);

		requestAnimationFrame(() => {
			e.target.selectionStart = selectionStart + 3;
			e.target.selectionEnd = selectionStart + 3;
		});
	}

	// Notes Save
	async function save() {
		await onSave(value.trim() || null);
		setEditing(false);
	};

	// Notes Edit Cancel
	function cancel() {
		setValue(initialValue || "");
		setEditing(false);
	}

	return{
		editing, value, setValue, textAreaRef, 
		startEditing, handleKeyDown, save, cancel
	}
}