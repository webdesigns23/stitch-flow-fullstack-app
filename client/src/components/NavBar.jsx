import React from "react";
import { LayoutDashboard, Folder, SquareScissors, SquareCheck, LogOut } from "lucide-react";
import {NavLink, useNavigate} from "react-router-dom";
import "../styles/NavBar.css"
import logo from "../assets/logo1.png"
import { capitalizeWords } from "../utils/formatText";
import { getInitials } from "../utils/formatText";

const NAV_ITEMS = [
	{ to: "/" , label: "Dashboard", icon: LayoutDashboard, end: true },
	{ to: "/projects", label: "Projects", icon: Folder },
	{ to: "/patterns", label: "Patterns", icon: SquareScissors },
	{ to: "/completed", label: "Completed", icon: SquareCheck },
]

export default function NavBar({user, setUser}) {
	const navigate = useNavigate();
	
	function handleLogout() {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);

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
					<NavLink to={to} end={end} className="nav-icon-link" aria-label={label}>
						<Icon size={23} color="#ab9717"/>
					</NavLink>
					<span className="nav-tooltip">{label}</span>
				</li>
			))}
		</ul>
		<button className="logout_btn" onClick={handleLogout} aria-label="Logout">
			<LogOut size={18}/>
			<span className="nav-tooltip">Logout</span>
		</button>	

    </nav>
  );
}
