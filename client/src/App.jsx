import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(error.message || String(error));
      }finally{
        setLoading(false);
      }
    };
    fetchData()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <h1>Sewing Project Manager</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ): (
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              Title: {project.title} - Status: {project.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
