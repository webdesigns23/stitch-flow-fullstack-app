import { useState, useEffect, useContext } from 'react'
import PatternCard from "./PatternCard"
import { PatternContext } from '../../context/PatternContext';

export default function PatternGallery() {
	const {
		patterns, setPatterns,
		loading, setLoading,
		error, setError
	} = useContext(PatternContext)

	  
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
	}, [])

	//Delete Pattern
	async function handleDelete(id) {
		try {
			setLoading(true);
			const response = await fetch(`http://127.0.0.1:5555/patterns/${id}`, {
				method: "DELETE"});
			if (!response.ok && response.status !==204) {
				throw new Error(`${response.status}`);
			}
			setPatterns(prev => prev.filter(p => p.id !==id));
		} catch (error) {
			setError(`Failed to delete pattern: ${error}`)
		} finally {
			setLoading(false);
		}
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>
	
  return (
	<>
	  <h1>Patterns</h1>
	  {patterns.length === 0 ? (
		<p>No patterns found!</p>
	  ): (
		<div className="gallery">
		  {patterns.map(pattern => (
			<div key={pattern.id} className="gallery-item">
				<PatternCard 
				pattern={pattern} 
				handleDelete={() => handleDelete(pattern.id)}
				/>
			</div>
		  ))}
		</div>
	  )}
	</>
  )
}