import React, { Component } from 'react';
import Comment from './comment'; // Import the Comment component

class CommentsList extends Component {
  render() {
    const { comments } = this.props;

    return (
      <div style={styles.commentsContainer}>
        <h2>Comments</h2>
        <hr />
        {comments.map((comment, index) => (
          <Comment
            key={index}
            username={comment.username}
            profile={comment.profile}
            text={comment.text}
          />
        ))}
        <p style={styles.viewAll}>View all →</p>
      </div>
    );
  }
}

const styles = {
  commentsContainer: {
    padding: '20px',
    backgroundColor: '#f1f1f1',
    width: '300px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  viewAll: {
    textAlign: 'right',
    cursor: 'pointer',
    color: 'black',
    fontWeight: 'bold',
  },
};

export default CommentsList;
