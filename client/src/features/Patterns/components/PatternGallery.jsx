import { useContext } from 'react'
import PatternCard from "./PatternCard"
import { PatternContext } from '../context/PatternContext'

export default function PatternGallery() {
	const {
		patterns, 
		loading, 
		error, 
	} = useContext(PatternContext)
	  
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>
	
  return (
	<>
	  {patterns.length === 0 ? (
		<div>
			<h2>Looks like you don't have any Patterns Added!</h2> 
			<p>Click the Add New Pattern button above to add your first Pattern</p>
		</div>
	  ): (
		<div className="gallery">
		  {patterns.map(pattern => (
			<div key={pattern.id} className="gallery-item">
				<PatternCard 
				pattern={pattern} 
				/>
			</div>
		  ))}
		</div>
	  )}
	</>
  )
}