import { useState, useEffect } from "react"
import LoginForm from "../components/authorization/LoginForm";
import SignUpForm from "../components/authorization/SignupForm";
import logo from "../assets/logo1.png"
import "../styles/Landing.css"

export default function LandingPage({onLogin}) {
	const [showSignup, setShowSignup] = useState(false);

	useEffect(() => {
		document.body.classList.add("landing-bg");
		return () => document.body.classList.remove("landing-bg");
	}, []);

	return (
		<div className="landing-page">
			{/* Welcome/About Section */}
			<div className="landing-welcome"> 
				<h1>Welcome to Stitch Flow</h1>
				
				<h2>
					Stay inspired and organized with all your sewing projects in one easy space
				</h2><div className="fade-in-image">
					<img src="src/assets/Planning.png" width="100%" alt="sewing supplies, thread, scissors, measuring tape"/>
				</div>
				<p>
					A sewing project management tracker that helps casual sewists, quilters, and cosplayers turn creative ideas into finished projects. Plan your projects, track your progress, and keep all your pattern specs, materials, and project notes in one place. Whether you're starting something new or revisiting a favorite creation, StitchFlow keeps your sewing projects moving smoothly from the first stitch to the final seam so you can spend less time organizing and more time sewing.
				</p>
				
			</div>


			{/* Auth Section */}
			<div className="landing-auth">
				<img className="logo" src={logo} alt="Stitch Flow Logo" />
				<h2>Your Creative Workspace...</h2>

				{/* Toggle signup/login form */}
				{showSignup ? (
				<SignUpForm onLogin={onLogin} />
				) : (
				<LoginForm onLogin={onLogin} />
				)}
		
				<h3>
				{showSignup ? "Already have an account?" : "Don't have an account?"}
				</h3>
				<div className="button-landing">
					<button onClick={() => setShowSignup(prevState => !prevState)}>
						{showSignup ? "Back to Login" : "Sign Up Now!"}
					</button>
				</div>
			</div>
		</div>
	)
}