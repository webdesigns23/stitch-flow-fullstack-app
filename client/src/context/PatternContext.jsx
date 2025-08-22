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
			const response = await fetch("http://127.0.0.1:5555/patterns")
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
	async function deletePattern(id) {
		try {
			setLoading(true);
			const response = await fetch(`http://127.0.0.1:5555/patterns/${id}`, {
				method: "DELETE"});
			if (!response.ok && response.status !==204) {
				throw new Error(`${response.status}`);
			}
			setPatterns(prev => prev.filter(p => p.id !==id));
			return true;
		} catch (error) {
			setError(`Failed to delete pattern: ${error}`)
			return false;
		} finally {
			setLoading(false);
		}
	}

  return(
	<PatternContext.Provider value={{
	  patterns, setPatterns,
	  loading, setLoading,
	  error, setError,
	  deletePattern}}>
	  {children}
	</PatternContext.Provider>
  );
}
