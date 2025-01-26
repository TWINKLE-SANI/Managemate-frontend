import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createGlobalStyle } from 'styled-components';
import axios from 'axios';


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const [error, setError] = useState(""); // Error state to hold error messages


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  function handleSubmit(event) {
    event.preventDefault();
   
    // Reset error before making a new login attempt
    setError("");


    axios
      .post('http://localhost:3001/login', formData)
      .then((res) => {
        console.log(res);

        // Check if login is successful
        if (res.data.success) {
          navigate("/dashboard"); // Redirect to dash.js
        } else {
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Login failed. Please check your credentials and try again.");
      });
  }


  return (
    <div className="login-page">
      <h1 className="title">ManageMate</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Log In</button>
        </form>
      </div>
      <p className="signup-link">
        Don't have an account? <a href="signup">Sign Up</a>
      </p>
    </div>
  );
}


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');


  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  body {
    font-family: 'Poppins', sans-serif;
    background-color: #E8D9F1;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
  }


  .login-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }


  .title {
    font-size: 80px;
    color: #4B2D6B;
    font-family: 'Lobster', cursive;
    margin-bottom: 30px;
    text-align: center;
    letter-spacing: 2px;
  }


  .form-container {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 60px 80px;
    border-radius: 15px;
    border: 3px solid #D1A6D1;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 60%;
    max-width: 800px;
  }


  input {
    width: 100%;
    padding: 15px;
    margin: 10px 0;
    border: 2px solid #D1A6D1;
    border-radius: 8px;
    font-size: 16px;
  }


  button {
    width: 100%;
    padding: 15px;
    background-color: #5C2D91;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
  }


  .error-message {
    color: #e74c3c;
    font-size: 14px;
  }


  .signup-link {
    margin-top: 20px;
  }


  .signup-link a {
    color: #5C2D91;
    text-decoration: none;
  }


  .signup-link a:hover {
    text-decoration: underline;
  }
`;


function App() {
  return (
    <div>
      <GlobalStyle />
      <Login />
    </div>
  );
}


export default App;



