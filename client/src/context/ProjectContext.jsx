import React, { createContext, useState, useEffect } from "react";
import { fetchProjects, deleteProjectById, updateProjectById } from "../api/projects";
import { getToday, parseDeadline } from "../utils/dateUtils";
export const ProjectContext = createContext(null);

export function ProjectsProvider({children}){

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  //Lists all Projects
	useEffect(() => {
		async function fetchData() {
		try{
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
			const response = await updateProjectById(project_id, updates);
			const data = await response.json();
			if (!response.ok) throw new Error(`${response.status}`);			
			setProjects(prev => prev.map(p => (p.id === project_id ? data : p)));
			return data;
		} catch	(error) {
		setError(`Failed to update project: ${error.message || error}`)
		throw error; 
		} 
	}

	//Project past due date
	function isOverdue(project_deadline) {
		if (!project_deadline) return false;
		return parseDeadline(project_deadline) < getToday();
	}

	// Due in 7 days
	function isDueSoon(project_deadline) {
		if (!project_deadline) return false;
		if (isOverdue(project_deadline)) return false;
		return (parseDeadline(project_deadline) - getToday()) <= 7 * 24 * 60 * 60 * 1000;
	}

	//# Days overdue
	function daysOverdue(project_deadline) {
		if (!project_deadline) return 0;
		return Math.floor((getToday() - parseDeadline(project_deadline))/ (24 * 60 * 60 * 1000))
	}

	//# Days until due
	function daysUntilDue(project_deadline) {
		if (!project_deadline) return 0;
		return Math.floor((parseDeadline(project_deadline) - getToday())/ (24 * 60 * 60 * 1000))
	}

  return(
    <ProjectContext.Provider value={{
      projects, setProjects,
      loading, error, setError,
      deleteProject,
      updateProject,
	  isOverdue, isDueSoon,
	  daysOverdue, daysUntilDue}}>
      {children}
    </ProjectContext.Provider>
  );
}

