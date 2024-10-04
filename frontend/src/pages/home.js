import React, { useState } from 'react';
import Sidebar from "../components/sidebar";
import AddSongForm from '../components/addSong';
import AddPlaylistForm from '../components/createPlaylist';
import SongFeed from '../components/songFeed';
import PlaylistFeed from '../components/playlistFeed';
import CommentList from '../components/commentList';
import AddComment from '../components/addComment'; // Import AddComment component

const Home = () => {
  const [showAddItem, setShowAddItem] = useState(false);
  const [activeTab, setActiveTab] = useState('songs');
  const [showAddComment, setShowAddComment] = useState(false); // State to manage AddComment visibility
  const [comments, setComments] = useState([
    {
      username: 'user1',
      profile: 'https://via.placeholder.com/40',
      text: 'Mid at best',
    },
    {
      username: 'user2',
      profile: 'https://via.placeholder.com/40',
      text: 'This is one of the best things I\'ve heard, I honestly love this!',
    }
  ]);

  const handleNewItemClick = () => {
    setShowAddItem(prevState => !prevState);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowAddItem(false);
  };

  const handleAddCommentClick = () => {
    setShowAddComment(prevState => !prevState); // Toggle AddComment form visibility
  };

  const handleCommentSubmit = (newComment) => {
    // Add new comment to the list
    setComments([...comments, { username: 'NewUser', profile: 'https://via.placeholder.com/40', text: newComment }]);
    setShowAddComment(false); // Hide the AddComment form after submission
  };

  return (
    <div style={styles.homePage}>
      <Sidebar username='johndoe'/>
      <div style={styles.content}>
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
            <button style={styles.newItemBtn} onClick={handleNewItemClick}>
              {activeTab === 'songs' ? '+ new song' : '+ new playlist'}
            </button>
            <input
              type="text"
              placeholder="Search for a song, playlist or user"
              style={styles.searchBar}
            />
          </div>
        </div>

        {showAddItem ? (
          activeTab === 'songs' ? (
            <AddSongForm />
          ) : (
            <AddPlaylistForm />
          )
        ) : (
          <div style={styles.songs}>
            {activeTab === 'songs' ? (
              <>
                <h2 style={styles.songsTitle}>Songs</h2>
                <div style={styles.songsHeader}>
                  <span>Track</span>
                  <span>Album</span>
                  <span>Date Added</span>
                  <span>User</span>
                </div>
                <SongFeed />
              </>
            ) : (
              <>
                <h2 style={styles.songsTitle}>Playlists</h2>
                <PlaylistFeed />
              </>
            )}
          </div>
        )}

        {/* Add Comment Button */}
        <button style={styles.addCommentBtn} onClick={handleAddCommentClick}>
          {showAddComment ? 'Cancel' : 'Add Comment'}
        </button>

        {/* Show AddComment form when button is clicked */}
        {showAddComment && <AddComment onCommentSubmit={handleCommentSubmit} />}

        {/* Comments Section */}
        <CommentList comments={comments} />
      </div>
    </div>
  );
};

// Inline styles
const styles = {
  homePage: {
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
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  tabs: {
    display: 'flex',
  },
  tab: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#444',
    color: '#fff',
    marginRight: '10px',
    cursor: 'pointer',
  },
  activeTab: {
    backgroundColor: '#ff77e9',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
  },
  newItemBtn: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '20px',
    padding: '10px 20px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  searchBar: {
    padding: '10px',
    borderRadius: '20px',
    border: 'none',
    width: '250px',
    maxWidth: '100%',
    boxSizing: 'border-box',
  },
  songs: {
    marginTop: '20px',
  },
  songsTitle: {
    fontSize: '24px',
    marginBottom: '10px',
  },
  songsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #fff',
    paddingBottom: '10px',
  },
  addCommentBtn: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff77e9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;


// helllo