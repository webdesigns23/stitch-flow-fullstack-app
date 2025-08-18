import React, { createContext, useState } from "react";

//1. creat context-TripContext
export const ProjectContext = createContext(null);

export function ProjectsProvider({children}){

  //2. define global state
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return(
    //3. provide trip state to all components
    <ProjectContext.Provider value={{
      projects, setProjects,
      loading, setLoading,
	  error, setError}}>
      {children}
    </ProjectContext.Provider>
  );
}
