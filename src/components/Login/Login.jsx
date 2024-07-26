import React, { useState } from "react";
import Logo from "../../assets/login-logo.png";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const signIn = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then((auth)=> {
      if (auth) {
        navigate("/")
      }
    })
  }

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password).then(auth=> 
      {
        if (auth) {
          navigate("/")
        }
      }
    ).then(error => {
      alert(error.message)
    })
  };
  return (
    <div className="login">
      <Link to="/">
        <img className="header-logo" src={Logo} alt="logo-img" />
      </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <form action="">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" Enter Your Email"
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" Enter Your Password"
          />
          <button className="login-sigInBtn" type="submit" onClick={signIn}>
            Sign in
          </button>
          <p className="paragraph-noitce">
            By continuing, you agree to Amazon's Conditions of Use and Privacy
            Notice.
          </p>
          <button className="login-registerBtn" onClick={register}>
            Create Your Amazon Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
