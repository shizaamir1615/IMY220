import React from 'react';
import PlaylistPreview from './playlistPreview';
import { fuzzySearchPlaylists } from './fuzzySearch';

const PlaylistFeed = ({ searchTerm = '' }) => {
  const playlists = [
    {
      picture: "/assets/images.jpg",
      name: "Ordinary",
      dateCreated: "2017-09-02",
      username: "Shiza",
      tracks: "10",
      genre: "Pop"
    },
    {
      picture: "/assets/images.jpg",
      name: "Sunlight",
      dateCreated: "2017-09-02",
      username: "Shiza",
      tracks: "10",
      genre: "Pop"
    },
    {
      picture: "/assets/images.jpg",
      name: "Summer",
      dateCreated: "2017-09-02",
      username: "Shiza",
      tracks: "10",
      genre: "Pop"
    },
    {
      picture: "/assets/images.jpg",
      name: "Winter",
      dateCreated: "2017-09-02",
      username: "Shiza",
      tracks: "10",
      genre: "Pop"
    },
    {
      picture: "/assets/images.jpg",
      name: "Autumn",
      dateCreated: "2017-09-02",
      username: "Shiza",
      tracks: "10",
      genre: "Pop"
    },
    {
      picture: "/assets/images.jpg",
      name: "Spring",
      dateCreated: "2017-09-02",
      username: "Shiza",
      tracks: "10",
      genre: "Pop"
    },
    {
      picture: "/assets/images.jpg",
      name: "Midnight",
      dateCreated: "2017-09-02",
      username: "Shiza",
      tracks: "10",
      genre: "Pop"
    },
    {
      picture: "/assets/images.jpg",
      name: "Midnight",
      dateCreated: "2017-09-02",
      username: "Shiza",
      tracks: "10",
      genre: "Pop"
    },
    {
      picture: "/assets/images.jpg",
      name: "Morning Coffee",
      dateCreated: "2024-01-15",
      username: "Alex",
      tracks: "15",
      genre: "Jazz"
    },
    {
      picture: "/assets/images.jpg",
      name: "Workout Mix",
      dateCreated: "2024-02-20",
      username: "Chris",
      tracks: "20",
      genre: "Electronic"
    }
  ];

  const filteredPlaylists = fuzzySearchPlaylists(playlists, searchTerm);

  return (
    <div className="space-y-4">
      {filteredPlaylists.map((playlist, index) => (
        <PlaylistPreview
          key={index}
          picture={playlist.picture}
          name={playlist.name}
          dateCreated={playlist.dateCreated}
          username={playlist.username}
          tracks={playlist.tracks}
          genre={playlist.genre}
        />
      ))}
      {filteredPlaylists.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No playlists found matching your search.
        </div>
      )}
    </div>
  );
};

export default PlaylistFeed;