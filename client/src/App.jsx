import { useState, useEffect } from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom';
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
import { me, guestLogin } from "./api/auth";
import statuses from "./assets/Planning.png"


export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [checkAuth, setCheckAuth] = useState(true);
  const [ guestLoading, setGuestLoading ] = useState(false);


  // Check for token first
  useEffect(() => {
    async function checkCurrentUser() {
      if (!token) {
        setCheckAuth(false);
        return;
      }

      try {
        const response = await me();

        if (!response.ok) {
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("User not authorized", error);
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
      } finally {
        setCheckAuth(false);
      }
    }
    
    checkCurrentUser();
  }, [token]);

  // User Login
  const onLogin = (newToken, loggedInUser) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(loggedInUser);
  };
  
  // Guest Login Button
  const handleGuestLogin = async () => {
    setGuestLoading(true);

    try {
      const response = await guestLogin();

      if (!response.ok) {
        throw new Error(`Guest login failed: ${response.status}`);
      }

      const data = await response.json();
      onLogin(data.token, data.user);
    } catch (error) {
      console.error("Guest login failed", error);
    } finally {
      setGuestLoading(false);
    }
  }

  // Logout user
  function handleLogout() {
		localStorage.removeItem("token");
		setToken(null);
		setUser(null);
	};

  
  if (checkAuth) return <div>  
    <img src={statuses} width="100%" alt="sewing supplies, thread, scissors, measuring tape"/>
    </div>

  if (!user) {
    return <LandingPage 
      onLogin={onLogin} 
      onGuestLogin={handleGuestLogin}
      guestLoading={guestLoading}/>
  };

  return (
    <>
      <PatternProvider token={token}>
        <ProjectsProvider token={token}>
          <BrowserRouter>  
            <ScrollToTop />
            <NavBar user={user} onLogout={handleLogout}/>
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


