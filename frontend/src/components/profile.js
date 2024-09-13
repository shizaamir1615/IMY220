import React, { Component } from 'react';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFriend: this.props.isFriend, // This can be passed down as a prop
    };
  }

  handleFollowToggle = () => {
    this.setState((prevState) => ({
      isFriend: !prevState.isFriend,
    }));
  };

  render() {
    const { profilePicture, name, username } = this.props;
    const { isFriend } = this.state;

    return (
      <div style={styles.container}>
        <div style={styles.profile}>
          {/* Profile Picture */}
          <img
            src={profilePicture}
            alt={`${name}'s profile`}
            style={styles.profilePicture}
          />
          {/* Name and Username */}
          <div>
            <p style={styles.username}>@{username}</p>
            <p style={styles.name}>{name}</p>
          </div>
        </div>
        {/* Follow/Unfollow Button */}
        <button
          style={styles.button}
          onClick={this.handleFollowToggle}
        >
          {isFriend ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    );
  }
}

// Styling for the component
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1A1A',
    padding: '10px',
    borderRadius: '20px',
    width: '400px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
  },
  profilePicture: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  username: {
    margin: '0',
    color: '#fff',
    fontSize: '14px',
  },
  name: {
    margin: '0',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#FF66CC',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default UserProfile;


// import React from 'react';
// import UserProfile from './UserProfile';

// function App() {
//   return (
//     <div>
//       <UserProfile
//         profilePicture="path_to_profile_picture.jpg"
//         name="John Doe"
//         username="johndoe"
//         isFriend={false}
//       />
//     </div>
//   );
// }

// export default App;
