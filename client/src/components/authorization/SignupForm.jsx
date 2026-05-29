import { useState } from "react";
import { signup } from "../../api/auth";
import "../../styles/Landing.css"

export default function SignUpForm({onLogin}) {
	const [email, setEmail] = useState("");
  	const [password, setPassword] = useState("");
  	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [displayName, setDisplayName] = useState("");

	const [error, setError] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [loading, setLoading] = useState(false);

	async function handleSignup(e) {
		e.preventDefault();
		setError(null);
		setEmailError(null);
		setPasswordError(null);

		if (password !== passwordConfirmation) {
			setPasswordError("Passwords do not match, try again!");
			return;
		}

		try {
			setLoading(true);
			const response = await signup(email, password, passwordConfirmation, displayName);
			const data = await response.json();

			if (!response.ok) {
				if (data?.errors) {
					setEmailError(data.errors.email || null);
					setPasswordError(
						data.errors.password || data.errors.password_confirmation || null
					);
					setError(
						data.errors.display_name ||
						data.errors.non_field ||
						null
					);
				} else if (typeof data?.error === "string") {
					setError(data.error);
				} else {
					setError("Signup failed. Please try again.");
				}
				return;
}
						
			onLogin?.(data.token, data.user);

		} catch (error) {
			console.error("Signup request failed:", error)
			setError(`Signup request failed: ${error.message}`);
		} finally {
			setLoading(false);
		}
	}

	return(
		<form className="signup_form" onSubmit={handleSignup}>
			<div className="form_field">
				<label> Email:
					<input 
					type="email" 
					placeholder="email" 
					value={email}
					onChange={(e) =>setEmail(e.target.value)} 
					required
					/>
				</label>
				{emailError && <p className="error">{emailError}</p>}
				<label> Password:
					<input 
					type="password" 
					placeholder="password" 
					value={password}
					onChange={(e) =>setPassword(e.target.value)} 
					required
					maxLength={35}
					/>
				</label>
				<label> Confirm Password:
					<input 
					type="password" 
					placeholder="password confirmation" 
					value={passwordConfirmation}
					onChange={(e) =>setPasswordConfirmation(e.target.value)} 
					required
					maxLength={35}
					/>
				</label>
				{passwordError && <p className="error">{passwordError}</p>}
				<label> Display Name:
					<input 
					type="text" 
					placeholder="display name" 
					value={displayName}
					onChange={(e) =>setDisplayName(e.target.value)} 
					required
					maxLength={35}
					/>
				</label>
			</div>
			{error && <p className="error"> {error}</p>}

			<div className="button-landing">
				<button type="submit" disabled={loading}>
					{loading ? "Signing Up..." : "Sign Up"}
				</button>
			</div>
		</form>
	)
}