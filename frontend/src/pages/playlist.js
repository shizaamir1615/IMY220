import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from "../components/Sidebar";

const Playlist = () => {
  const { id } = useParams();

  const playlistData = {
    id: id,
    name: "Awesome Playlist",
    tracks: 25,
    genre: "Rock",
    username: "johndoe",
    picture: "/api/placeholder/300/300",
    songs: [
      { title: "Hello", artist: "Justin Bieber", duration: "3:45" },
      { title: "Banger", artist: "Artist 2", duration: "4:05" },
      { title: "Party time", artist: "Artist 3", duration: "2:30" },
      { title: "Midnight", artist: "Artist 4", duration: "3:15" },
      { title: "Fun Night", artist: "Dua Lipa", duration: "3:50" },
      { title: "Summer Vibes", artist: "Calvin Harris", duration: "4:10" },
    ]
  };

  const displayedSongs = playlistData.songs.slice(0, 5);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [image, setImage] = useState(null);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const newCommentsArray = [
        ...comments,
        {
          username: playlistData.username,
          text: newComment,
          image: image,
          likes: 0, // Initialize likes for the new comment
        },
      ];
      setComments(newCommentsArray);
      setNewComment(''); // Clear the input after submission
      setImage(null); // Clear the image input after submission
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Create a local URL for the image preview
    }
  };

  const handleLikeComment = (index) => {
    const updatedComments = [...comments];
    updatedComments[index].likes += 1; // Increment the likes count for the specific comment
    setComments(updatedComments);
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

        {/* Song List */}
        <h2 style={styles.songListTitle}>Songs</h2>
        <ul style={styles.songList}>
          {displayedSongs.map((song, index) => (
            <li key={index} style={styles.songItem}>
              <span style={styles.songTitle}>{song.title}</span> - 
              <span style={styles.songArtist}> {song.artist}</span>
              <span style={styles.songDuration}> ({song.duration})</span>
            </li>
          ))}
        </ul>

        {/* Comments Section */}
        <h2 style={styles.commentSectionTitle}>Comments</h2>
        <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={styles.commentInput}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.imageInput}
          />
          <button type="submit" style={styles.commentButton}>Submit</button>
        </form>

        {/* Display Comments */}
        <div style={styles.commentList}>
          {comments.length === 0 ? (
            <p style={styles.noComments}>No comments yet.</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} style={styles.commentContainer}>
                <p style={styles.username}>@{comment.username}:</p>
                <p style={styles.commentText}>{comment.text}</p>
                {comment.image && <img src={comment.image} alt="Comment Attachment" style={styles.commentImage} />}
                <div style={styles.likesContainer}>
                  <button onClick={() => handleLikeComment(index)} style={styles.likeButton}>
                    👍 {comment.likes}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
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
  songListTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '30px',
  },
  songList: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '10px',
  },
  songItem: {
    margin: '8px 0',
  },
  songTitle: {
    fontWeight: 'bold',
  },
  songArtist: {
    fontStyle: 'italic',
    color: '#ddd',
  },
  songDuration: {
    color: '#bbb',
  },
  commentSectionTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginTop: '30px',
  },
  commentForm: {
    display: 'flex',
    marginTop: '10px',
  },
  commentInput: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    marginRight: '10px',
  },
  imageInput: {
    marginRight: '10px',
  },
  commentButton: {
    padding: '10px 15px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  commentList: {
    marginTop: '20px',
  },
  commentContainer: {
    marginBottom: '10px',
  },
  commentText: {
    margin: '0',
  },
  commentImage: {
    maxWidth: '100px',
    maxHeight: '100px',
    borderRadius: '5px',
    marginTop: '5px',
  },
  noComments: {
    color: '#ccc',
  },
  likesContainer: {
    marginTop: '5px',
  },
  likeButton: {
    background: 'none',
    border: 'none',
    color: '#007BFF',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default Playlist;
