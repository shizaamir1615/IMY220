import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import AddSongForm from '../components/addSong';
import AddPlaylistForm from '../components/createPlaylist';
import SongFeed from '../components/songFeed';
import PlaylistFeed from '../components/playlistFeed';
import CommentList from '../components/commentList';
import AddComment from '../components/addComment';

const Home = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeTab, setActiveTab] = useState('songs');
  const [showAddComment, setShowAddComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      
      const userData = localStorage.getItem('user');
      
      if (!userData) {
        console.log('No user data found in localStorage');
        navigate('/');
        return;
      }

      try {
        const parsedUserData = JSON.parse(userData);
        
        if (!parsedUserData.id) {
          console.log('No user ID found in stored data');
          navigate('/');
          return;
        }

        const response = await fetch(`http://localhost:1337/api/user/${parsedUserData.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }

        const data = await response.json();
        console.log('Fetched user data:', data);

        setUsername(data.email);
        setName(data.name);
        setIsLoading(false);

      } catch (error) {
        console.error('Error in fetchUserData:', error);
        setError(error.message);
        setIsLoading(false);
        
        if (error.message.includes('unauthorized') || error.message.includes('invalid token')) {
          navigate('/');
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleAddSong = (songData) => {
    // Handle the new song submission here
    console.log('New song:', songData);
    setShowAddItem(false);
  };

  const handleNewItemClick = () => {
    setShowAddItem(prevState => !prevState);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowAddItem(false);
  };

  const handleAddCommentClick = () => {
    setShowAddComment(prevState => !prevState);
  };

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, { username, profile: 'https://via.placeholder.com/40', text: newComment }]);
    setShowAddComment(false);
  };

  const [showSuggestions, setShowSuggestions] = useState(false);


  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value.toLowerCase());
    setShowSuggestions(true);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error loading user data: {error}</p>
        <button onClick={() => navigate('/')}>Return to Login</button>
      </div>
    );
  }

  
  const displayName = name || username || 'User';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error loading user data: {error}</p>
        <button onClick={() => navigate('/')}>Return to Login</button>
      </div>
    );
  }

  return (
    <div style={styles.homePage}>
      <div style={styles.sidebarContainer}>
        <Sidebar username={displayName} />
      </div>
      <div style={styles.mainContainer}>
        <div style={styles.topBarContainer}>
          <div style={styles.topBar}>
            <div style={styles.tabs}>
              <button
                style={{ ...styles.tab, ...(activeTab === 'playlists' ? styles.activeTab : {}) }}
                onClick={() => handleTabClick('playlists')}
              >
                Playlists
              </button>
              <button
                style={{ ...styles.tab, ...(activeTab === 'songs' ? styles.activeTab : {}) }}
                onClick={() => handleTabClick('songs')}
              >
                Songs
              </button>
            </div>
            <div style={styles.actions}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="Search for a song, playlist or user"
                  style={styles.searchBar}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                />
              </div>
              <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
        <div style={styles.scrollableContent}>
          {showAddItem && activeTab === 'songs' && (
            <div style={styles.formContainer}>
              <AddSongForm onSubmit={handleAddSong} />
            </div>
          )}
          {activeTab === 'songs' ? (
            <SongFeed searchTerm={searchTerm} />
          ) : (
            <PlaylistFeed searchTerm={searchTerm} />
          )}
          {/* <CommentList comments={comments} />
          {showAddComment && <AddComment onSubmit={handleCommentSubmit} />} */}
        </div>
      </div>
    </div>
  );
};

const styles = {
  homePage: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden', // Prevent scrolling on the main container
  },
  sidebarContainer: {
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    width: '240px', // Adjust based on your sidebar width
    zIndex: 10,
  },
  mainContainer: {
    marginLeft: '240px', // Should match sidebar width
    width: 'calc(100% - 240px)',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  topBarContainer: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#fff',
    zIndex: 5,
    borderBottom: '1px solid #eee',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
  },
  scrollableContent: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    height: 'calc(100vh - 80px)', // Adjust based on your top bar height
  },
  tabs: {
    display: 'flex',
  },
  tab: {
    margin: '0 10px',
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  activeTab: {
    backgroundColor: '#F177DF',
    color: '#fff',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  searchBar: {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    minWidth: '250px',
  },
  logoutBtn: {
    padding: '10px 20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#f5f5f5',
    },
  },
};

export default Home;