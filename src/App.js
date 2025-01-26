import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/login.js';  // Path to your Login component
import SignUp from './pages/signup.js';
import EventPage from './pages/dash.js';  


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
         <Route path="/dashboard" element={<EventPage />} />
      </Routes>
    </Router>
  );
}


export default App;



