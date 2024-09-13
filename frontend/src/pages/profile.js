import React, { useState } from 'react';
import Sidebar from "../components/sidebar"; // Adjust the path as needed
import ProfileView from '../components/profileView';
import ProfileEditForm from '../components/profileViewEdit';
import SongFeed from '../components/songFeed'; // Adjust the path as needed
import PlaylistFeed from '../components/playlistFeed'; // Adjust the path as needed

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    username: 'johndoe',
    friendCount: 150,
    bio: 'Music enthusiast and aspiring DJ',
    songCount: 250,
    playlistCount: 10,
    playlistSaves: 50,
    avatarUrl: '/api/placeholder/100/100', // placeholder image
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (updatedProfile) => {
    setProfileData(prevData => ({
      ...prevData,
      ...updatedProfile
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div style={styles.profilePage}>
      <Sidebar username={profileData.username} />
      <div style={styles.content}>
        <div style={styles.profileSection}>
          <ProfileView {...profileData} />
          {!isEditing && (
            <button onClick={handleEdit} style={styles.editButton}>
              Edit Profile
            </button>
          )}
        </div>
        <div style={styles.feedsSection}>
          <div style={styles.feedContainer}>
            <h2 style={styles.feedTitle}>Songs</h2>
            <SongFeed username={profileData.username} />
          </div>
          <div style={styles.feedContainer}>
            <h2 style={styles.feedTitle}>Playlists</h2>
            <PlaylistFeed username={profileData.username} />
          </div>
        </div>
        {isEditing && (
          <div style={styles.overlay}>
            <ProfileEditForm
              {...profileData}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  profilePage: {
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
    position: 'relative',
  },
  profileSection: {
    marginBottom: '30px',
    position: 'relative',
  },
  editButton: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  feedsSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
  feedContainer: {
    flex: 1,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    padding: '20px',
  },
  feedTitle: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
};

export default Profile;