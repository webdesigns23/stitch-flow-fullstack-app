import { useState, useEffect } from "react";
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
import LoginPage from './features/Auth/pages/LoginPage';
import logo from './/assets/logo.png'
import { PatternProvider } from "./features/Patterns/context/PatternContext";
import { ProjectsProvider } from "./features/Projects/context/ProjectContext";

export default function App() {
  const [user, setUser] = useState(null);
  const [checkAuth, setCheckAuth] = useState(true);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCheckAuth(false);
      return;
    }
    (async () => {
      try {
        const response = await fetch("http://127.0.0.1:5555/me" ,{
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const me = await response.json();
          setUser(me);
        } else {
          localStorage.removeItem("token");
          setUser(null);
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
  if (!user) return <LoginPage onLogin={onLogin}/>;

  return (
    <>
      <PatternProvider>
        <ProjectsProvider>
          <BrowserRouter>  
            <NavBar user={user} setUser={setUser}/>
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
        </ProjectsProvider>
      </PatternProvider>
    </>
  )
}


