import { useState } from "react"
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignupForm";
import logo from "../../../assets/logo.png"

export default function LoginPage({onLogin}) {
	const [showSignup, setShowSignup] = useState(false);

  return (
    <div>
      <div className="login_logo">
        <img src={logo} alt="Stitch Flow Logo" width="20%" />
      </div>
      {showSignup ? (
        <SignUpForm onLogin={onLogin} />
      ) : (
        <LoginForm onLogin={onLogin} />
      )}

      <hr />
      <p>
        {showSignup ? "Already have an account?" : "Don't have an account?"}
        <br />
        <button onClick={() => setShowSignup(prevState => !prevState)}>
          {showSignup ? "Back to Login" : "Sign Up Now!"}
        </button>
      </p>
    </div>
  );
}