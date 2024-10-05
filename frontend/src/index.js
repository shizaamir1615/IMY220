import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Updated import
import Sidebar from "./components/Sidebar";
import Splash from "./pages/splash";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/signup";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Playlist from "./pages/playlist"; // Assuming you have a Playlist component

const App = () => {
  // Assuming you store your token in localStorage
  const token = localStorage.getItem('authToken');
  let userId = null;

  if (token) {
    // Decode the token to get user details (e.g., userId)
    const decodedToken = jwtDecode(token); // Use jwtDecode here
    userId = decodedToken?.userId; // Extract userId from the token payload
  }

  return (
    <Router>
      <div className="app-container">
        {userId && <Sidebar profilePicture="/path/to/pic.png" username="User123" userId={userId} />} 
        {/* Sidebar with userId from token */}
        
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} /> {/* Dynamic route for profile */}
          <Route path="/playlist/:id" element={<Playlist />} /> {/* Dynamic route for playlist */}
        </Routes>
      </div>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
