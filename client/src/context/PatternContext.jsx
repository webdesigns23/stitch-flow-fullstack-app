import React, { createContext, useState } from "react";

//1. creat context-TripContext
export const PatternContext = createContext(null);

export function PatternProvider({children}){

  //2. define global state
  const [patterns, setPatterns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  return(
	//3. provide trip state to all components
	<PatternContext.Provider value={{
	  patterns, setPatterns,
	  loading, setLoading,
	  error, setError}}>
	  {children}
	</PatternContext.Provider>
  );
}
