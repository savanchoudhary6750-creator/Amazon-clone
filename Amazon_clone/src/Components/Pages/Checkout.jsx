import { Link, useNavigate } from "react-router-dom";

import "./Auth.css";

function Signup() {

  const navigate = useNavigate();

  const handleSignup = (e) => {

    e.preventDefault();

    navigate("/");
  };

  return (

    <div className="authContainer">

      <form
        className="authBox"
        onSubmit={handleSignup}
      >

        <div className="authLogo">
          Amazon<span>Clone</span>
        </div>

        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Enter Name"
          required
        />

        <input
          type="email"
          placeholder="Enter Email"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          required
        />

        <button type="submit">
          Signup
        </button>

        <p>
          Already have an account?

          <Link to="/">
            Login
          </Link>
        </p>

        <div className="authInfo">
          Secure signup system for
          Amazon Clone application.
        </div>

      </form>

    </div>
  );
}

export default Signup;