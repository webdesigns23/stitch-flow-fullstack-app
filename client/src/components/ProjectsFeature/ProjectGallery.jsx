import { useState, useEffect, useContext } from 'react'
import ProjectCard from "./ProjectCard"
import { ProjectContext } from '../../context/ProjectContext';

export default function ProjectGallery() {
	const statusKey = (s) =>
		(s || "").toLowerCase().trim().replace(/[_\s]+/g, "-");

	const {
		projects, setProjects,
		loading, setLoading,
		error, setError
	} = useContext(ProjectContext)

	  
	//Lists all Projects
	useEffect(() => {
		const fetchData = async() => {
		try{
			const response = await fetch("http://127.0.0.1:5555/projects")
			if (!response.ok) {
			throw new Error(`HTTP error!: ${response.status}`);
			}
			const data = await response.json();
			setProjects(Array.isArray(data) ? data : []);
		} catch (error){
			setError("Error loading project data", error);
		}finally{
			setLoading(false);
		}
		};
		fetchData()
	}, [])

	//Delete Project
	async function handleDelete(id) {
		try {
			setLoading(true);
			const response = await fetch(`http://127.0.0.1:5555/projects/${id}`, {
				method: "DELETE"});
			if (!response.ok && response.status !==204) {
				throw new Error(`${response.status}`);
			}
			setProjects(prev => prev.filter(p => p.id !==id));
		} catch (error) {
			setError(`Failed to delete project: ${error.message || error}`)
		} finally {
			setLoading(false);
		}
	}

	//Update Project Status
	async function updateProject(id, updates) {
		try{
			const response = await fetch(`http://127.0.0.1:5555/projects/${id}`, {
			method: "PATCH",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(updates),
		});
		const data = await response.json();
		if (!response.ok) throw new Error(`${response.status}`);			
		setProjects(prev => prev.map(p => (p.id === id ? data : p)));
		} catch	(error) {
			setError(`Failed to update project: ${error.message || error}`)
		} 
	}

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error}</p>

	
  return (
	<>
	  <h2>Current Projects:</h2>
	  {projects.length === 0 ? (
		<p>No projects found!</p>
	  ): (
		<div className="gallery">
		  {projects.map(project => (
			<div key={project.id} 
			className="gallery-item" 
			data-status={statusKey(project.status)}>
				<ProjectCard 
				project={project} 
				handleDelete={() => handleDelete(project.id)}
				updateProject={(updates) => updateProject(project.id, updates)}
				/>
			</div>
		  ))}
		</div>
	  )}
	</>
  )
}