import React, { useState, useEffect } from 'react';

const Input = ({ label, ...props }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>{label}</label>
    <input style={styles.input} {...props} />
  </div>
);

const TextArea = ({ label, ...props }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>{label}</label>
    <textarea style={styles.textarea} {...props} />
  </div>
);

const ProfileEditForm = ({
  name,
  username,
  friendCount,
  bio,
  songCount,
  playlistCount,
  playlistSaves,
  avatarUrl,
  onSave,
  onCancel
}) => {
  const [profile, setProfile] = useState({
    name,
    username,
    bio,
    avatarUrl
  });

  useEffect(() => {
    setProfile({ name, username, bio, avatarUrl });
  }, [name, username, bio, avatarUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.avatarContainer}>
          <img src={profile.avatarUrl || "/api/placeholder/100/100"} alt={profile.name} style={styles.avatar} />
        </div>
        <Input
          label="Name"
          name="name"
          value={profile.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Username"
          name="username"
          value={profile.username}
          onChange={handleChange}
          required
        />
        <TextArea
          label="Bio"
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          rows={3}
        />
        <Input
          label="Avatar URL"
          name="avatarUrl"
          value={profile.avatarUrl}
          onChange={handleChange}
        />
        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.saveButton}>Save Changes</button>
          <button type="button" style={styles.cancelButton} onClick={onCancel}>Cancel</button>
        </div>
      </form>
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <span style={styles.statLabel}>Friends</span>
          <span style={styles.statValue}>{friendCount}</span>
        </div>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
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
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '4px',
    fontSize: '14px',
    fontWeight: 'medium',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  textarea: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    minHeight: '100px',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '20px',
  },
  saveButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#f5f5f5',
    color: '#333',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  statsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  statItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
  },
  statLabel: {
    color: '#666',
  },
  statValue: {
    fontWeight: 'bold',
  },
};

export default ProfileEditForm;