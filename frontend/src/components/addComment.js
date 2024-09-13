// frontend/src/components/addComment.js

import React, { useState } from 'react';

const AddComment = ({ onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onCommentSubmit(commentText); // Call parent function to submit comment
      setCommentText(''); // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
        style={styles.textarea}
      />
      <button type="submit" style={styles.submitBtn}>Submit Comment</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#ff77e9',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddComment;
