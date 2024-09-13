import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../components/sidebar";

const Playlist = () => {
  const { id } = useParams();

  // In a real application, you would fetch the playlist data based on the id
  const playlistData = {
    id: id,
    name: "Awesome Playlist",
    tracks: 25,
    genre: "Rock",
    username: "johndoe",
    picture: "/api/placeholder/300/300"
  };

  return (
    <div style={styles.playlistPage}>
      <Sidebar username={playlistData.username} />
      <div style={styles.content}>
        <img src={playlistData.picture} alt="Playlist cover" style={styles.image} />
        <h1 style={styles.title}>{playlistData.name}</h1>
        <p style={styles.info}>{playlistData.tracks} tracks • {playlistData.genre}</p>
        <p style={styles.username}>Created by @{playlistData.username}</p>
        <p style={styles.id}>Playlist ID: {playlistData.id}</p>
        {/* Add more playlist details and a list of songs here */}
      </div>
    </div>
  );
};

const styles = {
  playlistPage: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    background: 'linear-gradient(to bottom, #333, #666)',
    padding: '20px',
    color: '#fff',
    overflow: 'auto',
    boxSizing: 'border-box',
  },
  image: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginTop: '20px',
  },
  info: {
    fontSize: '16px',
    color: '#ccc',
  },
  username: {
    fontSize: '14px',
    color: '#aaa',
  },
  id: {
    fontSize: '12px',
    color: '#888',
    marginTop: '20px',
  },
};

export default Playlist;