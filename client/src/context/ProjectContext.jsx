import React, { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext(null);

export function ProjectsProvider({children}){

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Lists all Projects
	useEffect(() => {
		async function fetchData() {
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
	async function deleteProject(id) {
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
		throw error; //if kanban messes up
		} 
	}

  return(
    <ProjectContext.Provider value={{
      projects, setProjects,
      loading, setLoading,
	    error, setError,
      deleteProject,
      updateProject}}>
      {children}
    </ProjectContext.Provider>
  );
}
