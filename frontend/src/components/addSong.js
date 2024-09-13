import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddSongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: '',
      artistName: ''
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { songName, artistName } = this.state;
    this.props.onSubmit({ songName, artistName });
    this.setState({ songName: '', artistName: '' });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { songName, artistName } = this.state;

    return (
      <div className="add-song-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="songName">Song name</label>
            <input
              type="text"
              id="songName"
              value={songName}
              onChange={this.handleChange}
              placeholder="Enter song name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="artistName">Artist</label>
            <input
              type="text"
              id="artistName"
              value={artistName}
              onChange={this.handleChange}
              placeholder="Enter artist name"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Add</button>
          </div>
        </form>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;600&display=swap');

          .add-song-container {
            background: linear-gradient(135deg, #E080DE, #9198e5);
            border-radius: 30px;
            padding: 30px;
            width: 400px; /* Adjust container width */
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-family: 'Urbanist', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: flex-start; /* Align items to the left */
          }

          .form-group {
            margin-bottom: 20px;
            width: 100%;
          }

          label {
            display: block;
            color: white;
            font-size: 18px;
            margin-bottom: 5px;
            text-align: left; /* Align label text to the left */
          }

          input {
            width: 100%;
            padding: 10px;
            background: transparent;
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.7);
            color: white;
            font-size: 16px;
            outline: none;
            font-family: 'Urbanist', sans-serif;
            box-sizing: border-box; /* Ensure padding and border are included in the width */
          }

          input::placeholder {
            color: rgba(255, 255, 255, 0.7);
          }

          .button-container {
            display: flex;
            justify-content: center; /* Center button within the container */
            width: 100%;
          }

          button {
            background-color: #FF69B4;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 10px 20px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 400px; /* Adjust button width */
            font-family: 'Urbanist', sans-serif;
            text-align: center; /* Center text within the button */
          }

          button:hover {
            background-color: #FF1493;
          }
        `}</style>
      </div>
    );
  }
}

AddSongForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AddSongForm;
