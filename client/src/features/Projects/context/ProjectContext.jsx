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
			const token = localStorage.getItem("token");
			const response = await fetch("http://127.0.0.1:5555/projects", {
				headers: {
					"Accept": "application/json",
					...(token ? {Authorization: `Bearer ${token}`}: {}),
				},
			})
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
	async function deleteProject(project_id) {
		try {
			setLoading(true);
			const token = localStorage.getItem("token");
			const response = await fetch(`http://127.0.0.1:5555/projects/${project_id}`, {
				method: "DELETE",
				headers: {
				"Accept": "application/json",
				...(token ? {Authorization: `Bearer ${token}`}: {}),
				},
			});
			if (!response.ok && response.status !==204) {
				throw new Error(`${response.status}`);
			}
			setProjects(prev => prev.filter(p => p.id !==project_id));
		} catch (error) {
			setError(`Failed to delete project: ${error.message || error}`)
		} finally {
			setLoading(false);
		}
	}

	//Update Project Status
	async function updateProject(project_id, updates) {
		try{
			const token = localStorage.getItem("token");
			const response = await fetch(`http://127.0.0.1:5555/projects/${project_id}`, {
			method: "PATCH",
			headers: {"Content-Type": "application/json",
			Accept: "application/json",
				...(token ? {Authorization: `Bearer ${token}`}: {}),},
			body: JSON.stringify(updates),
		});
		const data = await response.json();
		if (!response.ok) throw new Error(`${response.status}`);			
		setProjects(prev => prev.map(p => (p.id === project_id ? data : p)));
		} catch	(error) {
		setError(`Failed to update project: ${error.message || error}`)
		throw error; 
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

