import { useContext, useState } from 'react'
import { PatternContext } from '../../context/PatternContext'
import PatternCard from "./PatternCard"

const CATEGORIES = ["clothing", "accessories", "quilting", "home_decor", "costumes", "other"]

export default function PatternGallery() {
	const [ searchPattern, setSearchPattern ] = useState("");

	const { patterns, loading, error } = useContext(PatternContext);

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>
	
	//Handle no patterns
	if (patterns.length === 0) {
		return (
			<div className='kanban-empty'>
				<h2>Looks like you don't have any Patterns Added!</h2>
				<p>
					Click the "Add New Pattern" button to add your first Pattern
				</p>
			</div>
		)
	}

	//Search patterns
	const query = searchPattern.toLowerCase();

	const filteredPatterns = patterns.filter(p => 
		p.name.toLowerCase().includes(query) ||
		p.brand.toLowerCase().includes(query) ||
		p.pattern_number.toLowerCase().includes(query)
	);

	//Group patterns in to sections by category
	const categorySections = CATEGORIES.reduce((acc, cat) => {
		const matches = filteredPatterns.filter(p => p.category === cat);
		if (matches.length > 0) acc[cat] = matches;
		return acc;
	}, {});

	const activeCategories = Object.keys(categorySections);

	return (
		<>
			<div className="toolbar">
				{/* Search bar */}
				<div className='search-bar'>
					<label>Search Patterns: 
						<input
							type="text"
							placeholder="Search by name, brand, or number..."
							value={searchPattern}
							onChange={(e) => setSearchPattern(e.target.value)} />
					</label>
				</div>

				{/* Pattern Filter Nav Bar and Pills*/}
				<div className="kanban-month-filter-nav">
					{activeCategories.map(cat => (
						<a
							key={cat}
							href={`#category-${cat}`}
							className="kanban-month-filter-pill"
						>
							{cat.replace(/_/g, " ")}
						</a>
					))}
				</div>

			</div>
			<div className="kanban-board">
					{/* Category Sections */}
					{activeCategories.map(cat => (
					<section
						key={cat}
						id={`category-${cat}`}
						className="kanban-month"
					>
						<div className="kanban-month-header">
							<h2 className="kanban-month-title">
								{cat.replace(/_/g, " ")}
							</h2>
							<div />
							<hr className="kanban-month-line" />
						</div>

						<div className="gallery">
							{categorySections[cat].map(pattern => (
								<div key={pattern.id} className="gallery-item">
									<PatternCard pattern={pattern} />
								</div>
							))}
						</div>
					</section>
				))}
			</div>
		</>
	)
}