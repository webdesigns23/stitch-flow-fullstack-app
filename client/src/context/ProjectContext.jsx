import React, { createContext, useState, useEffect } from "react";
import { fetchProjects, deleteProjectById, updateProjectById } from "../api/projects";
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
			const response = await fetchProjects();
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
			const response = await deleteProjectById(project_id);
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
			const response = await updateProjectById(project_id, updates);
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
      loading,
	    error, setError,
      deleteProject,
      updateProject}}>
      {children}
    </ProjectContext.Provider>
  );
}

