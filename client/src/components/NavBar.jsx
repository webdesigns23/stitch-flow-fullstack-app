import React from "react";
import {NavLink} from "react-router-dom";
import "../styles/NavBar.css"
import logo from "../assets/logo.png"

export default function NavBar({user, setUser}) {
	function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
    localStorage.removeItem("token");
    setUser(null);
  }


	return (
    <nav className="navbar">
		<button className="logout_btn" onClick={handleLogout}>
			Logout
		</button>	

		<img src={logo} width="100%" alt="stitch flow logo"/>

		<h2>welcome {user?.username}</h2>

		<ul className="nav-links">
			<NavLink to="/">Home</NavLink>
			<NavLink to="/dashboard">Dashboard</NavLink>
			<NavLink to="/patterns">Patterns</NavLink>
			<NavLink to="/projects">Projects</NavLink>
			<NavLink to="/materials">Materials</NavLink>
			<NavLink to="/completed">Completed</NavLink>
		</ul>
    </nav>
  );
}
