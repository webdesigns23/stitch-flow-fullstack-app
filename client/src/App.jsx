import { useState, useEffect } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './styles/App.css'
import NavBar from './components/NavBar';
import DashboardPage from './pages/DashboardPage';
import MaterialsPage from "./pages/MaterialsPage";
import ProjectPage from './pages/ProjectPage';
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import CompletedPage from './pages/CompletedPage';
import PatternPage from './pages/PatternPage';
import PatternDetailsPage from './pages/PatternDetailsPage'
import LandingPage from "./pages/LandingPage";
import ScrollToTop from "./components/ScrollToTop";
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
    <img src="src/assets/Planning.png" width="100%" alt="sewing supplies, thread, scissors, measuring tape"/>
    </div>
  if (!user) return <LandingPage onLogin={onLogin}/>;

  return (
    <>
      <PatternProvider>
        <ProjectsProvider>
          <BrowserRouter>  
            <ScrollToTop />
            <NavBar user={user} setUser={setUser}/>
            <main className="main">
              <div className="container">
                <Routes>
                  <Route path="/" element={<DashboardPage user={user} />} />
                  <Route path="/materials" element={<MaterialsPage />} />
                  <Route path="/projects" element={<ProjectPage />} />
                  <Route path="/projects/:id" element={<ProjectDetailsPage />} />
                  <Route path ="/patterns" element={<PatternPage />} />
                  <Route path ="/patterns/:id" element={<PatternDetailsPage />} />
                  <Route path="/completed" element={<CompletedPage />} />
                </Routes>
              </div>
            </main>      
          </BrowserRouter>      
        </ProjectsProvider>
      </PatternProvider>
    </>
  )
}


