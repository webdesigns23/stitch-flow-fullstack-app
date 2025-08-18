import React from "react";
import {NavLink} from "react-router-dom";
import "../styles/NavBar.css"

export default function NavBar() {
	return (
    <nav className="navbar">
		<img src="./src/assets/new_logo.png"/>

		<ul className="nav-links">
			<NavLink to="/">Home</NavLink>
			<NavLink to="/dashboard">Dashboard</NavLink>
			<NavLink to="/projects">Projects</NavLink>
			<NavLink to="/patterns">Patterns</NavLink>
			<NavLink to="/materials">Materials</NavLink>
		</ul>
    </nav>
  );
}
