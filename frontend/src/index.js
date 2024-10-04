// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Splash from "./pages/splash";
// import LoginPage from "./pages/login";
// import RegisterPage from "./pages/signup";
// import Sidebar from "./components/sidebar";
// import AddSongForm from "./components/addSong";
// import SongListItem from "./components/song";
// import SongList from "./components/songFeed";
// import PlaylistCard from "./components/playlistPreview";

// import AddToPlaylist from "./components/addToPlaylist";
// import UserProfile from "./components/profile";
// import Home from "./pages/home";
// import CreatePlaylist from "./components/createPlaylist";
// import ProfileView from "./components/profileView";
// import ProfileEditForm from "./components/profileViewEdit";
// import Profile from "./pages/profile";


// const App = () => (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         {/* <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<RegisterPage />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/playlist/:id" element={<Playlist />} /> */}
//       </Routes>
//     </Router>
//   );
  
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<App />);


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Splash from './pages/splash';
// import LoginPage from './pages/login';
// import RegisterPage from './pages/signup';
// import Home from './pages/home';
// import Profile from './pages/profile';
// import Playlist from './pages/playlist'; // Assuming you have a Playlist component

// const App = () => (
//   <Router>
//     <Routes>
//       <Route path="/" element={<Splash />} />
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/signup" element={<RegisterPage />} />
//       <Route path="/home" element={<Home />} />
//       <Route path="/profile" element={<Profile />} />
//       <Route path="/playlist" element={<Playlist />} />
//     </Routes>
//   </Router>
// );

// export default App;
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splash from "./pages/splash";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/signup";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Playlist from "./pages/playlist"; // Assuming you have a Playlist component

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile/:id" element={<Profile />} /> {/* Dynamic route for profile */}
      <Route path="/playlist/:id" element={<Playlist />} /> {/* Dynamic route for playlist */}
    </Routes>
  </Router>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
