import React from 'react';
import PlaylistPreview from '../PlaylistPreview'; // Update the path as needed
import EditPlaylist from '../EditPlaylist'; // Update the path as needed

class PlaylistManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      playlist: {
        picture: '/path/to/picture',
        name: 'My Playlist',
        tracks: 10,
        genre: 'Pop',
        username: 'user123',
      },
    };
  }

  handleEditClick = () => {
    this.setState({ isEditing: true });
  }

  handleSave = (updatedPlaylist) => {
    this.setState({
      playlist: { ...this.state.playlist, ...updatedPlaylist },
      isEditing: false,
    });
  }

  handleCancel = () => {
    this.setState({ isEditing: false });
  }

  render() {
    const { isEditing, playlist } = this.state;

    return (
      <div>
        {isEditing ? (
          <EditPlaylist
            name={playlist.name}
            genre={playlist.genre}
            tracks={playlist.tracks}
            onSave={this.handleSave}
            onCancel={this.handleCancel}
          />
        ) : (
          <PlaylistPreview
            picture={playlist.picture}
            name={playlist.name}
            tracks={playlist.tracks}
            genre={playlist.genre}
            username={playlist.username}
            onEdit={this.handleEditClick}
          />
        )}
      </div>
    );
  }
}

export default PlaylistManager;
