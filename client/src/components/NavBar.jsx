import React from "react";
import {NavLink, useNavigate} from "react-router-dom";
import "../styles/NavBar.css"
import logo from "../assets/sf_logo.png"
import { capitalizeWords } from "../utils/formatText";

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
			Welcome, {capitalizeWords(user?.display_name)}
		</p>

		<ul className="nav-links">
			<NavLink to="/">Dashboard</NavLink>
			<NavLink to="/projects">Projects</NavLink>
			<NavLink to="/patterns">Patterns</NavLink>
			<NavLink to="/completed">Completed</NavLink>
		</ul>
		<button className="logout_btn" onClick={handleLogout}>
			Logout
		</button>	

    </nav>
  );
}
