import React from 'react';
import Song from './song'; // Ensure the path and file name are correct
import PlaylistPreview from './playlistPreview';

class PlaylistFeed extends React.Component {
  render() {
    return (
      <div>
        <PlaylistPreview
            picture="/assets/images.jpg"
            name="Midnight"
            dateCreated="2017-09-02"
            username="Shiza"
            tracks="10"
            genre="Pop"
        />
        <PlaylistPreview
            picture="/assets/images.jpg"
            name="Midnight"
            dateCreated="2017-09-02"
            username="Shiza"
            tracks="10"
            genre="Pop"
        />
      </div>
    );
  }
}

export default PlaylistFeed;
