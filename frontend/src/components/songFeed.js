// SongFeed.js
import React from 'react';
import Song from './song';
import { fuzzySearchSongs } from './fuzzySearch';

const SongFeed = ({ searchTerm = '' }) => {
  const songs = [
    {
      number: 1,
      picture: "/assets/images/hello.jpg",
      songName: "Hello",
      artist: "Johnny Cash",
      albumName: "#TheBestofJohnnyCash",
      dateAdded: "3 Nov 2024",
      username: "user_one"
    },
    {
      number: 2,
      picture: "/assets/images/banger.jpg",
      songName: "Banger",
      artist: "Justin Bieber",
      albumName: "#Purpose",
      dateAdded: "2 Nov 2024",
      username: "user_two"
    },
    {
      number: 3,
      picture: "/assets/images/party_time.jpg",
      songName: "Party Time",
      artist: "Katy Perry",
      albumName: "#TeenageDream",
      dateAdded: "30 October 2024",
      username: "user_three"
    },
    {
      number: 4,
      picture: "/assets/images/fun_night.jpg",
      songName: "Fun Night",
      artist: "Dua Lipa",
      albumName: "Future Nostalgia",
      dateAdded: "28 October 2024",
      username: "user_four"
    },
    {
      number: 5,
      picture: "/assets/images/summer_vibes.jpg",
      songName: "Summer Vibes",
      artist: "Calvin Harris",
      albumName: "#FunkWavBouncesVol. 1",
      dateAdded: "27 October 2024",
      username: "user_five"
    },
    {
      number: 6,
      picture: "/assets/images/feel_good.jpg",
      songName: "Feel Good",
      artist: "Maroon 5",
      albumName: "#RedPillBlues",
      dateAdded: "26 October 2024",
      username: "user_six"
    },
    {
      number: 7,
      picture: "/assets/images/dance_all_night.jpg",
      songName: "#DanceAllNight",
      artist: "Shawn Mendes",
      albumName: "Illuminate",
      dateAdded: "25 October 2024",
      username: "user_seven"
    },
    {
      number: 8,
      picture: "/assets/images/good_times.jpg",
      songName: "Good Times",
      artist: "Taylor Swift",
      albumName: "#1989",
      dateAdded: "24 October 2024",
      username: "user_eight"
    },
    {
      number: 9,
      picture: "/assets/images.jpg",
      songName: "Watermelon Sugar",
      artist: "Harry Styles",
      albumName: "#FineLine",
      dateAdded: "27 October 2024",
      username: "username"
    },
    {
      number: 10,
      picture: "/assets/images.jpg",
      songName: "Levitating",
      artist: "Dua Lipa",
      albumName: "#FutureNostalgia",
      dateAdded: "26 October 2024",
      username: "username"
    }
  ];

  const filteredSongs = fuzzySearchSongs(songs, searchTerm);

  return (
    <div className="space-y-4">
      {filteredSongs.map((song, index) => (
        <Song
          key={index}
          number={index + 1}
          picture={song.picture}
          songName={song.songName}
          artist={song.artist}
          albumName={song.albumName}
          dateAdded={song.dateAdded}
          username={song.username}
        />
      ))}
      {filteredSongs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No songs found matching your search.
        </div>
      )}
    </div>
  );
};

export default SongFeed;