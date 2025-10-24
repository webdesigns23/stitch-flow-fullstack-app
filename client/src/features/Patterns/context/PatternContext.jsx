import React, { createContext, useState, useEffect } from "react";

export const PatternContext = createContext(null);

export function PatternProvider({children}){

  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //Lists all Patterns
	useEffect(() => {
		const fetchData = async() => {
		try{
			const token = localStorage.getItem("token");
			const response = await fetch("http://127.0.0.1:5555/patterns", {
				headers: {
					"Accept": "application/json",
					...(token ? {Authorization: `Bearer ${token}`}: {}),
				},
			});
			if (!response.ok) {
			throw new Error(`HTTP error!: ${response.status}`);
			}
			const data = await response.json();
			setPatterns(Array.isArray(data) ? data : []);
		} catch (error){
			setError("Error loading pattern data", error);
		}finally{
			setLoading(false);
		}
		};
		fetchData()
	}, [setLoading, setError, setPatterns]) 

	//Delete Pattern
	async function deletePattern(pattern_id) {
		setError(null);
		setLoading(true);

		try {
			const token = localStorage.getItem("token");
			const response = await fetch(`http://127.0.0.1:5555/patterns/${pattern_id}`, {
				method: "DELETE",
			headers: {
				"Accept": "application/json",
				...(token ? {Authorization: `Bearer ${token}`}: {}),
				},
			});
			if (!response.ok && response.status !==204) {
				throw new Error(`${response.status}`);
			}
			setPatterns(prev => prev.filter((p) => p.id !==pattern_id));
			return true;
		} catch (error) {
			setError(`Failed to delete pattern: ${error}`)
			return false;
		} finally {
			setLoading(false);
		}
	}

	//Update Pattern
	async function updatePattern(pattern_id, updates) {
		setError(null)
		setLoading(true);

		const token = localStorage.getItem("token");
		const data = {...updates};

		try{
			const response = await fetch(`http://127.0.0.1:5555/patterns/${pattern_id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				...(token ? {Authorization: `Bearer ${token}`}: {}),
			},
			body: JSON.stringify(data),
		});
		const data = await response.json();
		if (!response.ok) throw new Error(`${response.status}`);			
		setPatterns(prev => prev.map(p => (p.id === id ? data : p)));
		} catch	(error) {
		setError(`Failed to update project: ${error.message || error}`)
		} 
	}

  return(
	<PatternContext.Provider value={{
	  patterns, setPatterns,
	  loading, setLoading,
	  error, setError,
	  deletePattern,
	  updatePattern}}>
	  {children}
	</PatternContext.Provider>
  );
}