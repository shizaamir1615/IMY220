import React, { Component } from 'react';

class Comment extends Component {
  render() {
    const { username, profile, text } = this.props;

    return (
      <div style={styles.commentContainer}>
        <img src={profile} alt="Profile" style={styles.profileImage} />
        <div>
          <p style={styles.username}>@{username}</p>
          <p style={styles.commentText}>{text}</p>
        </div>
      </div>
    );
  }
}

const styles = {
  commentContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  profileImage: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  username: {
    fontWeight: 'bold',
    margin: '0',
  },
  commentText: {
    margin: '0',
  },
};

export default Comment;
