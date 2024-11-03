import React, { useState } from 'react';
import Sidebar from "../components/Sidebar"; // Adjust the path as needed
import ProfileView from '../components/profileView';
import ProfileEditForm from '../components/profileViewEdit';
import SongFeed from '../components/songFeed'; // Adjust the path as needed
import PlaylistFeed from '../components/playlistFeed'; // Adjust the path as needed

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Shiza',
    username: 'shizaa',
    friendCount: 11,
    bio: 'Music enthusiast and aspiring DJ',
    songCount: 10,
    playlistCount: 10,
    playlistSaves: 10,
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

// import React, { useState, useEffect } from 'react';
// import Sidebar from "../components/Sidebar";
// import ProfileView from '../components/profileView';
// import ProfileEditForm from '../components/profileViewEdit';
// import SongFeed from '../components/songFeed';
// import PlaylistFeed from '../components/playlistFeed';

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [profileData, setProfileData] = useState({
//     name: '',
//     username: '',
//     friendCount: 0,
//     bio: '',
//     songCount: 0,
//     playlistCount: 0,
//     playlistSaves: 0,
//     avatarUrl: '/api/placeholder/100/100',
//   });

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const currentUser = JSON.parse(localStorage.getItem('user'));
//       if (!currentUser) {
//         throw new Error('No user logged in');
//       }

//       // Fetch user profile data
//       const response = await fetch(`http://localhost:1337/api/user/${currentUser.id}`);
//       if (!response.ok) throw new Error('Failed to fetch user data');
//       const userData = await response.json();

//       // Fetch additional stats (you'll need to add these endpoints to your backend)
//       const [friendsResponse, songsResponse, playlistsResponse] = await Promise.all([
//         fetch(`http://localhost:1337/api/user/${currentUser.id}/friends/count`),
//         fetch(`http://localhost:1337/api/user/${currentUser.id}/songs/count`),
//         fetch(`http://localhost:1337/api/user/${currentUser.id}/playlists/count`)
//       ]);

//       const [friendsData, songsData, playlistsData] = await Promise.all([
//         friendsResponse.json(),
//         songsResponse.json(),
//         playlistsResponse.json()
//       ]);

//       setProfileData({
//         name: userData.name || '',
//         username: userData.email || '',
//         friendCount: friendsData.count || 0,
//         bio: userData.bio || 'No bio yet',
//         songCount: songsData.count || 0,
//         playlistCount: playlistsData.playlistCount || 0,
//         playlistSaves: playlistsData.savedCount || 0,
//         avatarUrl: userData.profilePicture || '/api/placeholder/100/100',
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError(error.message);
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async (updatedProfile) => {
//     try {
//       const currentUser = JSON.parse(localStorage.getItem('user'));
      
//       const response = await fetch(`http://localhost:1337/api/user/${currentUser.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(updatedProfile)
//       });

//       if (!response.ok) throw new Error('Failed to update profile');

//       setProfileData(prevData => ({
//         ...prevData,
//         ...updatedProfile
//       }));
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       // You might want to show an error message to the user here
//     }
//   };

//   const handleCancel = () => {
//     setIsEditing(false);
//   };

//   if (loading) {
//     return (
//       <div style={styles.profilePage}>
//         <Sidebar username={profileData.username} />
//         <div style={styles.content}>
//           <div>Loading...</div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div style={styles.profilePage}>
//         <Sidebar username={profileData.username} />
//         <div style={styles.content}>
//           <div>Error: {error}</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.profilePage}>
//       <Sidebar username={profileData.username} />
//       <div style={styles.content}>
//         <div style={styles.profileSection}>
//           <ProfileView {...profileData} />
//           {!isEditing && (
//             <button onClick={handleEdit} style={styles.editButton}>
//               Edit Profile
//             </button>
//           )}
//         </div>
//         <div style={styles.feedsSection}>
//           <div style={styles.feedContainer}>
//             <h2 style={styles.feedTitle}>Songs</h2>
//             <SongFeed username={profileData.username} />
//           </div>
//           <div style={styles.feedContainer}>
//             <h2 style={styles.feedTitle}>Playlists</h2>
//             <PlaylistFeed username={profileData.username} />
//           </div>
//         </div>
//         {isEditing && (
//           <div style={styles.overlay}>
//             <ProfileEditForm
//               {...profileData}
//               onSave={handleSave}
//               onCancel={handleCancel}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   profilePage: {
//     display: 'flex',
//     height: '100vh',
//     width: '100vw',
//     overflow: 'hidden',
//   },
//   content: {
//     flex: 1,
//     background: 'linear-gradient(to bottom, #333, #666)',
//     padding: '20px',
//     color: '#fff',
//     overflow: 'auto',
//     boxSizing: 'border-box',
//     position: 'relative',
//   },
//   profileSection: {
//     marginBottom: '30px',
//     position: 'relative',
//   },
//   editButton: {
//     position: 'absolute',
//     top: '20px',
//     right: '20px',
//     padding: '10px 20px',
//     fontSize: '16px',
//     backgroundColor: '#4A90E2',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer',
//   },
//   feedsSection: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     gap: '20px',
//   },
//   feedContainer: {
//     flex: 1,
//     background: 'rgba(255, 255, 255, 0.1)',
//     borderRadius: '10px',
//     padding: '20px',
//   },
//   feedTitle: {
//     fontSize: '24px',
//     marginBottom: '20px',
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000,
//   },
// };

// export default Profile;