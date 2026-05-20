import React, { createContext, useState, useEffect } from "react";
import { fetchPatterns, deletePatternById, updatePatternById } from "../api/patterns";

export const PatternContext = createContext(null);

export function PatternProvider({children}){		
  	const [patterns, setPatterns] = useState([]);
  	const [loading, setLoading] = useState(true);
  	const [error, setError] = useState(null);
	
  	//Lists all Patterns
	useEffect(() => {
		async function fetchData() {
		try{
			const response = await fetchPatterns();
			if (!response.ok) {
			throw new Error(`HTTP error!: ${response.status}`);
			}
			const data = await response.json();
			setPatterns(Array.isArray(data) ? data : []);
		} catch (error){
			setError(error.message);
		}finally{
			setLoading(false);
		}
		};
		fetchData()
	}, []); 

	//Delete Pattern
	async function deletePattern(pattern_id) {
		setError(null);
		setLoading(true);

		try {
			const response = await deletePatternById(pattern_id);
			if (!response.ok && response.status !==204) {
				throw new Error(`${response.status}`);
			}
			setPatterns(prev => prev.filter((p) => p.id !==pattern_id));
		} catch (error) {
			setError(`Failed to delete pattern: ${error}`)
			return false;
		} finally {
			setLoading(false);
		}
	};

	//Update Pattern
	async function updatePattern(pattern_id, updates) {
		setError(null)
		setLoading(true);

		try{
			const response = await updatePatternById(pattern_id, updates);
			if (!response.ok) {
				throw new Error(`${response.status}`);
			};	
			
			const updated = await response.json();
			setPatterns(prev => prev.map(p => (p.id === pattern_id ? {...p, ...updates} : p)));
			return updated;
		} catch	(error) {
		setError(`Failed to update pattern: ${error.message || error}`)
		} finally {
			setLoading(false);
		}
	};

  return(
	<PatternContext.Provider value={{
	  patterns, setPatterns,
	  loading, error, setError,
	  deletePattern, updatePattern}}>
	  {children}
	</PatternContext.Provider>
  );
}