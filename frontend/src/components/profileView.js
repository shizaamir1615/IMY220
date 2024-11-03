import React, { useState } from 'react';

const CameraIcon = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="white" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const ProfileView = ({
  name,
  username,
  friendCount,
  bio,
  songCount,
  playlistCount,
  playlistSaves,
  avatarUrl,
  onAvatarUpdate
}) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload image
    try {
      setUploadStatus('uploading');
      const formData = new FormData();
      formData.append('files', file);

      // First upload to Strapi Media Library
      const uploadResponse = await fetch('http://localhost:1337/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error('');
      
      const uploadResult = await uploadResponse.json();
      const imageUrl = uploadResult[0].url;

      // Update user profile with new image URL
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const updateResponse = await fetch(`http://localhost:1337/api/user/${currentUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          profilePicture: imageUrl,
        }),
      });

      if (!updateResponse.ok) throw new Error(' ');

      const updatedUser = await updateResponse.json();
      if (onAvatarUpdate) {
        onAvatarUpdate(imageUrl);
      }
      setUploadStatus('success');
    } catch (err) {
      setError(err.message);
      setUploadStatus('error');
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleImageChange(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Prevent default behavior (Prevent file from being opened)
  };

  const handleFileSelect = (event) => {
    handleImageChange(event.target.files[0]);
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
      position: 'relative',
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      overflow: 'hidden',
      margin: '0 auto 20px',
      backgroundColor: '#ddd',
      cursor: 'pointer',
      border: '2px dashed #aaa', // Optional: Add a border to indicate drag area
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatar: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '50%',
      backgroundColor: avatarUrl ? 'transparent' : 'purple', // Default purple circle
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
      color: 'black'
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
    uploadStatus: {
      textAlign: 'center',
      fontSize: '14px',
      marginTop: '10px',
    },
    error: {
      color: 'red',
      textAlign: 'center',
      fontSize: '14px',
      marginTop: '10px',
    },
    uploadButton: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '10px',
      padding: '10px',
      backgroundColor: 'black',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      alignItems: 'center',
    },
    uploadIcon: {
      marginRight: '5px',
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
      <div 
        style={styles.avatarContainer}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <img 
          src={imagePreview || avatarUrl || ""} 
          alt={name} 
          style={styles.avatar} 
        />
      </div>
      
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        onChange={handleFileSelect}
        id="fileInput"
      />
      <label htmlFor="fileInput" style={styles.uploadButton}>
        <CameraIcon style={styles.uploadIcon} />
        Upload Photo
      </label>
      
      {error && <div style={styles.error}>{error}</div>}
      {uploadStatus === 'uploading' && <div style={styles.uploadStatus}>Uploading...</div>}
      {uploadStatus === 'success' && <div style={styles.uploadStatus}>Updated successfully!</div>}

      <h2 style={styles.name}>{name}</h2>
      <p style={styles.username}>@{username}</p>
      <p style={styles.friendCount}>{friendCount} friends</p>
      <div style={styles.divider}></div>
      <p style={styles.bio}>{bio}</p>
      <div style={styles.divider}></div>
      <div style={styles.socialIcons}>
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" x="2" y="2" rx="5" stroke="black"/>
        </svg>
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" x="2" y="2" rx="5" stroke="black"/>
        </svg>
        <svg style={styles.icon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="20" x="2" y="2" rx="5" stroke="black"/>
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
          <span style={styles.statLabel}>Saves</span>
          <span style={styles.statValue}>{playlistSaves}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
