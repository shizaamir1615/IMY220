import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Splash from './pages/splash';
import LoginPage from './pages/login';
import RegisterPage from './pages/signup';
import Home from './pages/home';
import Profile from './pages/profile';
import Playlist from './pages/playlist'; // Assuming you have a Playlist component

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/playlist" element={<Playlist />} />
    </Routes>
  </Router>
);

export default App;
