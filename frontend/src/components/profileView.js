import React from 'react';

const ProfileView = ({
  name,
  username,
  friendCount,
  bio,
  songCount,
  playlistCount,
  playlistSaves,
  avatarUrl
}) => {
  const styles = {
    container: {
      width: '300px',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      overflow: 'hidden',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      boxSizing: 'border-box',
    },
    header: {
      position: 'relative',
      marginBottom: '20px',
    },
    editButton: {
      position: 'absolute',
      top: '0',
      right: '0',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
    },
    avatarContainer: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      overflow: 'hidden',
      margin: '0 auto 20px',
      backgroundColor: '#ddd',
    },
    avatar: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    name: {
      margin: '0 0 5px',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
    },
    username: {
      margin: '0 0 5px',
      color: 'black',
      textAlign: 'center',
    },
    friendCount: {
      margin: '0 0 15px',
      fontSize: '14px',
      color: 'black',
      textAlign: 'center',
    },
    divider: {
      borderTop: '1px solid #ddd',
      margin: '15px 0',
    },
    bio: {
      margin: '15px 0',
      fontSize: '14px',
      textAlign: 'center',
      
    },
    socialIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      margin: '15px 0',
    },
    icon: {
      width: '24px',
      height: '24px',
    },
    statsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    statItem: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '14px',
      color: 'black',
    },
    statLabel: {
      color: 'black',
    },
    statValue: {
      fontWeight: 'bold',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.editButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 3L21 8L8 21H3V16L16 3Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div style={styles.avatarContainer}>
        <img src={avatarUrl || "/api/placeholder/100/100"} alt={name} style={styles.avatar} />
      </div>
      <h2 style={styles.name}>{name}</h2>
      <p style={styles.username}>@{username}</p>
      <p style={styles.friendCount}>{friendCount} friends</p>
      <div style={styles.divider}></div>
      <p style={styles.bio}>{bio}</p>
      <div style={styles.divider}></div>
      <div style={styles.socialIcons}>
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" x="2" y="2" rx="5" stroke="black" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="black" strokeWidth="2" />
          <circle cx="18" cy="6" r="1" fill="black" />
        </svg>
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 7v10h-5v-5H8v5H3V7l9-4 9 4z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 4s-2.7 1-5.3 1.3C15.4 4.4 14 4 12.5 4 9.6 4 7 6.5 7 9.8v1.2C4 11 1 9 1 9s-1 4.5 3 8c0 0-2 1-4 1 2.2 1.3 4.8 2 7.5 2 8.8 0 15.5-7.2 15.5-16V3l-1 1z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Songs</span>
          <span style={styles.statValue}>{songCount}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Playlists</span>
          <span style={styles.statValue}>{playlistCount}</span>
        </div>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Playlist saves</span>
          <span style={styles.statValue}>{playlistSaves}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;