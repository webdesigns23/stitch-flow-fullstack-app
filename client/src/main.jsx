import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ProjectsProvider } from './context/ProjectContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProjectsProvider>
      <App />
    </ProjectsProvider>
  </StrictMode>,
)
