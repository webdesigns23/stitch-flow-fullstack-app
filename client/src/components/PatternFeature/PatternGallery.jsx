import { useContext } from 'react'
import PatternCard from "./PatternCard"
import { PatternContext } from '../../context/PatternContext';

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
		<p>No patterns found!</p>
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