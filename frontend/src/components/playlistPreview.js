import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditPlaylist = ({ name, genre, tracks, onSave, onCancel }) => {
  const [editedName, setEditedName] = useState(name);
  const [editedGenre, setEditedGenre] = useState(genre);
  const [editedTracks, setEditedTracks] = useState(tracks);

  const handleSave = () => {
    onSave({
      name: editedName,
      genre: editedGenre,
      tracks: editedTracks,
    });
  };

  return (
    <div style={styles.editContainer}>
      <h3>Edit Playlist</h3>
      <label>
        Name:
        <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      </label>
      <label>
        Genre:
        <input type="text" value={editedGenre} onChange={(e) => setEditedGenre(e.target.value)} />
      </label>
      <label>
        Tracks:
        <input type="number" value={editedTracks} onChange={(e) => setEditedTracks(Number(e.target.value))} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

const PlaylistPreview = ({ id, picture, name, tracks, genre, username }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [playlist, setPlaylist] = useState({ id, picture, name, tracks, genre, username });

  const handleClick = () => {
    navigate(`/playlist/${id}`);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (updatedPlaylist) => {
    setPlaylist({ ...playlist, ...updatedPlaylist });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <EditPlaylist
        name={playlist.name}
        genre={playlist.genre}
        tracks={playlist.tracks}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div style={styles.card} onClick={handleClick}>
      <div style={styles.imageContainer}>
        <img src={playlist.picture || "/api/placeholder/300/300"} alt="Playlist cover" style={styles.image} />
        <button style={styles.playButton}>
          <svg xmlns="http://www.w3.org/2000/svg" style={styles.playIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 22v-20l18 10-18 10z" />
          </svg>
        </button>
        <button style={styles.editButton} onClick={handleEditClick}>
          <svg xmlns="http://www.w3.org/2000/svg" style={styles.editIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          </svg>
        </button>
      </div>
      <div style={styles.infoContainer}>
        <h3 style={styles.playlistName}>{playlist.name}</h3>
        <p style={styles.tracksAndGenre}>{playlist.tracks} tracks • {playlist.genre}</p>
        <p style={styles.username}>@{playlist.username}</p>
      </div>
    </div>
  );
};

const styles = {

          card: {
            width: '250px',
            borderRadius: '10px',
            overflow: 'hidden',
            backgroundColor: '#2c2c2c',
            color: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            fontFamily: 'Arial, sans-serif',
          },
          imageContainer: {
            position: 'relative',
            width: '100%',
            height: '0',
            paddingBottom: '100%',
            backgroundColor: '#b3b3b3',
          },
          image: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          },
          playButton: {
            position: 'absolute',
            bottom: '10px',
            right: '10px',
            backgroundColor: 'white',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
          },
          playIcon: {
            width: '20px',
            height: '20px',
            fill: '#2c2c2c',
          },
          editButton: {
            position: 'absolute',
            top: '10px',
            right: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            border: 'none',
          },
          editIcon: {
            width: '16px',
            height: '16px',
            fill: '#2c2c2c',
          },
          infoContainer: {
            padding: '15px',
            backgroundColor: '#2c2c2c',
          },
          playlistName: {
            fontSize: '18px',
            margin: '0 0 5px',
          },
          tracksAndGenre: {
            fontSize: '14px',
            color: '#a5a5a5',
            margin: '0 0 5px',
          },
          username: {
            fontSize: '14px',
            color: '#a5a5a5',
          },
          editContainer: {
            padding: '15px',
            backgroundColor: '#2c2c2c',
            color: 'white',
          },
};

export default PlaylistPreview;