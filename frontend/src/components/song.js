import React, { useState, useRef, useEffect } from 'react';
import AddToPlaylist from '../components/addToPlaylist'; // Adjust the path as needed

const Song = ({ number, picture, songName, artist, albumName, dateAdded, username }) => {
  const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
  const addToPlaylistRef = useRef(null);

  const handleAddToPlaylistClick = () => {
    setShowAddToPlaylist(prevState => !prevState); // Toggle visibility
  };

  const handleClickOutside = (event) => {
    if (addToPlaylistRef.current && !addToPlaylistRef.current.contains(event.target)) {
      setShowAddToPlaylist(false); // Hide the component if clicked outside
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={styles.songContainer}>
      <div style={styles.songInfo}>
        <span style={styles.songNumber}>{number}</span>
        <img
          src={picture || "/api/placeholder/40/40"}
          alt="Album cover"
          style={styles.songImage}
        />
        <div style={styles.songDetails}>
          <span style={styles.songName}>{songName}</span>
          <span style={styles.songArtist}>{artist}</span>
        </div>
      </div>
      <div style={styles.songMeta}>
        <span style={styles.songAlbum}>{albumName}</span>
        <span style={styles.songDate}>{dateAdded}</span>
        <span style={styles.songUsername}>@{username}</span>
        <button style={styles.songAddBtn} onClick={handleAddToPlaylistClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={styles.songIcon}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {showAddToPlaylist && (
        <div
          ref={addToPlaylistRef}
          style={styles.addToPlaylistContainer}
        >
          <AddToPlaylist songName={songName} /> {/* Pass any needed props */}
        </div>
      )}
    </div>
  );
};

const styles = {
  songContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    backgroundColor: '#1a1a1a',
    borderBottom: '1px solid #333',
    color: 'white',
    position: 'relative', // Ensure positioning context for the overlay
  },
  songInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  songNumber: {
    color: '#888',
    fontSize: '14px',
    marginRight: '10px',
  },
  songImage: {
    width: '40px',
    height: '40px',
    borderRadius: '3px',
    marginRight: '10px',
  },
  songDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  songName: {
    fontWeight: 500,
    color: 'white',
  },
  songArtist: {
    fontSize: '14px',
    color: '#888',
  },
  songMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  songAlbum: {
    fontSize: '14px',
    color: '#888',
  },
  songDate: {
    fontSize: '14px',
    color: '#888',
  },
  songUsername: {
    fontSize: '14px',
    color: '#888',
  },
  songAddBtn: {
    background: 'none',
    border: 'none',
    color: '#888',
    cursor: 'pointer',
    padding: '5px',
  },
  songIcon: {
    width: '20px',
    height: '20px',
  },
  addToPlaylistContainer: {
    position: 'absolute',
    top: '0',
    right: '0',
    width: '300px', // Adjust width as needed
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
    zIndex: 1000, // Ensure it's on top
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default Song;
