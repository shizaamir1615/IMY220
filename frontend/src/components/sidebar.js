import React from "react";
import PropTypes from 'prop-types';

class Sidebar extends React.Component {
  static defaultProps = {
    profilePicture: '/assets/images/defaultProfile.png', 
    username: 'Name' 
  };

  render() {
    const { profilePicture, username } = this.props;

    return (
      <div className="sidebar">
        <img src="/assets/images/logoWhite.png" alt="Opula Logo" className="logo" />

        <div className="nav-menu">
          <a href="#" className="nav-item">
            <img src="/assets/images/homeIcon.png" alt="Home" className="icon" /> home
          </a>
          <a href="#" className="nav-item">
            <img src="/assets/images/searchIcon.png" alt="Search" className="icon" /> search
          </a>
          <a href="#" className="nav-item">
            <img src="/assets/images/friendsIcon.png" alt="Friends" className="icon" /> friends
          </a>
          <a href="#" className="nav-item">
            <img src="/assets/images/profileIcon.png" alt="Profile" className="icon" /> profile
          </a>
        </div>

        <div className="user-profile">
          <div 
            className="profile-circle" 
            style={{ backgroundImage: `url(${profilePicture})` }}
          ></div>
          <p className="username">{username}</p>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;700&display=swap');

          html, body {
            margin: 0;
            height: 100%;
            overflow: hidden;
          }

          .sidebar {
            height: 100vh;
            width: 250px;
            background-color: #ffffff;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0;
            margin: 0;
            border-right: 1px solid #e0e0e0;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            border-radius: 0 40px 40px 0; /* Round corners on the right */
          }

          .logo {
            width: 150px;
            margin: 30px 0; /* Adjust margin for spacing */
          }

          .nav-menu {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-top: 40px; /* Move menu a bit down */
          }

          .nav-item {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 20px;
            width: 100%;
            font-size: 18px;
            color: #333;
            text-decoration: none;
            font-weight: 600;
            font-family: 'Urbanist', sans-serif;
            box-sizing: border-box;
          }

          .icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
          }

          .user-profile {
            margin-top: auto;
            display: flex;
            align-items: center;
            justify-content: center; /* Center items horizontally */
            padding: 20px;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 20px;
          }

          .profile-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #ff49c6;
            background-size: cover;
            background-position: center;
            margin-right: 10px; /* Space between profile picture and username */
          }

          .username {
            text-align: center;
            font-weight: 600;
            color: #333;
            font-family: 'Urbanist', sans-serif;
            margin: 0; /* Remove default margin */
          }
        `}</style>
      </div>
    );
  }
}

Sidebar.propTypes = {
  profilePicture: PropTypes.string,
  username: PropTypes.string,
};

export default Sidebar;
