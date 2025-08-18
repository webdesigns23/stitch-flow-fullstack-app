import { useState, useEffect, useContext } from 'react'
import ProjectCard from "./ProjectCard"
import { ProjectContext } from '../../context/ProjectContext';

export default function ProjectPage() {
	const {
		projects, setProjects,
		loading, setLoading,
		error, setError
	} = useContext(ProjectContext)
  
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

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
	<>
	  <h1>Sewing Project Manager</h1>
	  {projects.length === 0 ? (
		<p>No projects found!</p>
	  ): (
		<div className="gallery">
		  {projects.map(project => (
			<div key={project.id} className="gallery-item">
				<ProjectCard project={project} />
			</div>
		  ))}
		</div>
	  )}
	</>
  )
}