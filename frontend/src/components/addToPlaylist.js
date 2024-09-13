import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddToPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlaylist: null,
    };
  }

  handleSelect = (index) => {
    this.setState({ selectedPlaylist: index });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { selectedPlaylist } = this.state;
    const { playlists } = this.props;
    
    if (selectedPlaylist !== null && playlists[selectedPlaylist]) {
      const selected = playlists[selectedPlaylist];
      this.props.onSubmit(selected);
    }
  };

  render() {
    const { playlists } = this.props;
    const { selectedPlaylist } = this.state;

    return (
      <div className="add-to-playlist-container">
        <h2>Add to playlist</h2>

        <button className="new-playlist-button">+ New playlist</button>

        <form onSubmit={this.handleSubmit}>
          <div className="playlists">
            {playlists && playlists.length > 0 ? (
              playlists.map((playlist, index) => (
                <div
                  key={index}
                  className={`playlist-item ${selectedPlaylist === index ? 'selected' : ''}`}
                  onClick={() => this.handleSelect(index)}
                >
                  <div className="playlist-checkbox"></div>
                  <span className="playlist-name">{playlist}</span>
                </div>
              ))
            ) : (
              <p>No playlists available</p>
            )}
          </div>

          <button type="submit" className="done-button">Done</button>
        </form>

        <style>{`
          .add-to-playlist-container {
            background: linear-gradient(135deg, #E080DE, #9198e5);
            border-radius: 30px;
            padding: 30px;
            width: 400px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            font-family: 'Urbanist', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          h2 {
            color: white;
            margin-bottom: 20px;
            font-size: 24px;
          }

          .new-playlist-button {
            background-color: #FF69B4;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
            margin-bottom: 20px;
          }

          .new-playlist-button:hover {
            background-color: #FF1493;
          }

          .playlists {
            width: 100%;
          }

          .playlist-item {
            display: flex;
            align-items: center;
            padding: 10px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            margin-bottom: 10px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .playlist-item.selected {
            background-color: rgba(255, 255, 255, 0.3);
          }

          .playlist-checkbox {
            width: 20px;
            height: 20px;
            border: 2px solid white;
            border-radius: 50%;
            margin-right: 10px;
          }

          .playlist-name {
            color: white;
            font-size: 16px;
          }

          .done-button {
            background-color: #FF69B4;
            color: white;
            border: none;
            border-radius: 20px;
            padding: 10px 20px;
            cursor: pointer;
            transition: background-color 0.3s;
            width: 100%;
            margin-top: 20px;
          }

          .done-button:hover {
            background-color: #FF1493;
          }
        `}</style>
      </div>
    );
  }
}

AddToPlaylist.propTypes = {
  playlists: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddToPlaylist;
