import React from 'react';
import Song from './song'; // Ensure the path and file name are correct

class SongFeed extends React.Component {
  render() {
    return (
      <div>
        <Song
          number={1}
          picture="/assets/images.jpg"
          songName="Song name"
          artist="artist"
          albumName="album name"
          dateAdded="date added"
          username="username"
        />
         <Song
          number={2}
          picture="/assets/images.jpg"
          songName="Song name"
          artist="artist"
          albumName="album name"
          dateAdded="date added"
          username="username"
        />
         <Song
          number={2}
          picture="/assets/images.jpg"
          songName="Song name"
          artist="artist"
          albumName="album name"
          dateAdded="date added"
          username="username"
        />
      </div>
    );
  }
}

export default SongFeed;
