import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './styles/App.css'
import NavBar from './components/NavBar';
import Home from './pages/HomePage';
import DashboardPage from './features/Dashboard/pages/DashboardPage';
import ProjectPage from './features/Projects/pages/ProjectPage';
import CompleteProjects from './features/Projects/pages/CompleteProjects';
import PatternPage from './features/Patterns/pages/PatternPage';
import PatternInfoPage from './features/Patterns/pages/PatternInfoPage'
import MaterialsPage from './pages/MaterialsPage';

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
              <Route path ="/patterns" element={<PatternPage />} />
              <Route path ="/patterns/:id" element={<PatternInfoPage />} />
              <Route path="/materials" element={<MaterialsPage />} />
              <Route path="/completed" element={<CompleteProjects />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter>


    </>
  )
}


