import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';
import Home from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import PatternPage from './pages/PatternPage';
import MaterialsPage from './pages/MaterialsPage';
import AddProjectForm from './components/ProjectsFeature/AddProjectForm';

export default function App() {
  return (
    <>
      <BrowserRouter>
      <NavBar/>
        <main className="main">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ProjectPage />} />
              <Route path="/patterns" element={<PatternPage />} />
              <Route path="/materials" element={<MaterialsPage />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>


    </>
  )
}


