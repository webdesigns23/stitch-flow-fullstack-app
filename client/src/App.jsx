import { useState, useEffect } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './styles/App.css'
import NavBar from './components/NavBar';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import CompleteProjects from './pages/CompleteProjects';
import PatternPage from './pages/PatternPage';
import PatternInfoPage from './pages/PatternInfoPage'
import MaterialsPage from './pages/MaterialsPage'
import LandingPage from "./pages/LandingPage";
import logo from './/assets/logo.png'
import { PatternProvider } from "./context/PatternContext";
import { ProjectsProvider } from "./context/ProjectContext";
import { me } from "./api/auth";


export default function App() {
  const [user, setUser] = useState(null);
  const [checkAuth, setCheckAuth] = useState(true);


  useEffect(() => {
    (async () => {
      try {
        const response = await me();
        if (!response.ok) {
          setCheckAuth(false);
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          localStorage.removeItem("token");
        }
      } catch (_) {
        setUser(null);
      } finally {
        setCheckAuth(false);
      }
    })();
  },[]);


  const onLogin = (token, user) => {
    localStorage.setItem("token", token);
    setUser(user);
    setCheckAuth(false);
  }
  
  if (checkAuth) return <div>  
    <h1>Checking Authorization...</h1>
    </div>
  if (!user) return <LandingPage onLogin={onLogin}/>;

  return (
    <>
      <PatternProvider>
        <ProjectsProvider>
          <BrowserRouter>  
            <NavBar user={user} setUser={setUser}/>
            <main className="main">
              <div className="container">
                <Routes>
                  <Route path="/" element={<DashboardPage user={user} />} />
                  <Route path="/projects" element={<ProjectPage />} />
                  <Route path ="/patterns" element={<PatternPage />} />
                  <Route path ="/patterns/:id" element={<PatternInfoPage />} />
                  <Route path="/materials" element={<MaterialsPage />} />
                  <Route path="/completed" element={<CompleteProjects />} />
                </Routes>
              </div>
            </main>      
          </BrowserRouter>      
        </ProjectsProvider>
      </PatternProvider>
    </>
  )
}


