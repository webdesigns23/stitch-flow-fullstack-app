import { useContext, useState } from 'react';
import PatternCard from "./PatternCard";
import { PatternContext } from '../../context/PatternContext';
import { capitalizeWords } from '../../utils/formatText';
import { Search, MoveUpRight } from "lucide-react";
import "../../styles/Kanban.css";

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
				<h2>
					Click the "Add New Pattern" button to add your first Pattern!
					<MoveUpRight size={75} />
				</h2>
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
					<label><Search /> 
						<input
							type="text"
							placeholder="Search by name, brand, or number..."
							value={searchPattern}
							onChange={(e) => setSearchPattern(e.target.value)} />
					</label>
				</div>

				{/* Pattern Filter Bar and Pills*/}
				<div className="pattern-project-filter-nav">
					{activeCategories.map(cat => (
						<a
							key={cat}
							href={`#category-${cat}`}
							className="pattern-project-filter-pill"
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
						className="kanban-filter"
					>
						<div className="kanban-filter-header">
							<h2 className="kanban-month-title">
								{cat.replace(/_/g, " ")}
							</h2>
							<div />
							<hr className="kanban-filter-line" />
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