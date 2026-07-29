import React from "react";
import { LayoutDashboard, Folder, Ruler, CircleCheckBig, LogOut } from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom";
import "../styles/NavBar.css"
import logo from "../assets/sf_logo.png"
import { capitalizeWords } from "../utils/formatText";
import { getInitials } from "../utils/formatText";

const NAV_ITEMS = [
	{ to: "/" , label: "Dashboard", icon: LayoutDashboard, end: true },
	{ to: "/projects", label: "Projects", icon: Folder },
	{ to: "/patterns", label: "Patterns", icon: Ruler },
	{ to: "/completed", label: "Completed", icon: CircleCheckBig },
]

export default function NavBar({user, onLogout}) {
	const navigate = useNavigate();
	
	function handleLogout() {
		onLogout();
		navigate("/");
	}

	return (
    <nav className="navbar">
		
		<img className="nav-logo" src={logo} width="100%" alt="stitch flow logo"/>
		<p className="nav-user">
			{getInitials(user?.display_name)}
		</p>

		<ul className="nav-links">
			{NAV_ITEMS.map(({to, label, icon: Icon, end}) => (
				<li key={to} className="nav-item">
					<NavLink 
						to={to} 
						end={end} 
						className="nav-link" aria-label={label}
					>
						<Icon size={20} color="#b18b0e"/>
					<span className="nav-label">{label}</span>	
					</NavLink>
				</li>
			))}
		</ul>
		<button className="logout_btn" onClick={handleLogout} aria-label="Logout">
			<LogOut size={20}/>
			<span className="nav-label">Logout</span>
		</button>	

    </nav>
  );
}
