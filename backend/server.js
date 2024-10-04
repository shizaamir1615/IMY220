const express = require("express");
const { MongoClient } = require("mongodb");
require('dotenv').config();
const cors = require('cors');

// Initialize the app
const app = express();
app.use(cors());
app.use(express.json()); // To handle JSON data

// MongoDB Connection String
const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db; // Declare a variable for the database

// Connect to MongoDB
async function connectToDB() {
    try {
        await client.connect();
        db = client.db("opula"); // Use or create a database called "playlistSharing"
        console.log("Connected to MongoDB!");

        // Start the server only after successful database connection
        app.listen(1337, () => {
            console.log("Listening on http://localhost:1337");
        });
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}

// Call the function to connect to the database
connectToDB();

// ROUTES

// User authentication
// Signup
app.post("/api/signup", async (req, res) => {
    try {
        const usersCollection = db.collection("users");
        const result = await usersCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to sign up", error });
    }
});

// Login
app.post("/api/login", async (req, res) => {
    try {
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email: req.body.email, password: req.body.password });
        
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to log in", error });
    }
});

// Logout (This is often handled on the client-side)
app.post("/api/logout", (req, res) => {
    // Logic for logout can be added here, like invalidating tokens if using JWT
    res.status(200).json({ message: "Logged out successfully" });
});

// Profile management
// View your profile
app.get("/api/profile", async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming userId is passed in the request body
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ _id: userId });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch profile", error });
    }
});

// Edit your profile
app.put("/api/profile", async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming userId is passed in the request body
        const updatedUser = req.body;
        const usersCollection = db.collection("users");
        await usersCollection.updateOne({ _id: userId }, { $set: updatedUser });
        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update profile", error });
    }
});

// View someone else's profile
app.get("/api/profile/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ _id: userId });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch profile", error });
    }
});

// Delete your profile
app.delete("/api/profile", async (req, res) => {
    try {
        const userId = req.body.userId; // Assuming userId is passed in the request body
        const usersCollection = db.collection("users");
        await usersCollection.deleteOne({ _id: userId });
        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete profile", error });
    }
});

// Friend / Unfriend API
app.post("/api/friend/:id", async (req, res) => {
    try {
        const userId = req.body.userId; // User sending the friend request
        const friendId = req.params.id; // ID of the friend to add
        const usersCollection = db.collection("users");
        await usersCollection.updateOne({ _id: userId }, { $addToSet: { friendList: friendId } });
        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add friend", error });
    }
});

// Unfriend
app.delete("/api/friend/:id", async (req, res) => {
    try {
        const userId = req.body.userId; // User sending the unfriend request
        const friendId = req.params.id; // ID of the friend to remove
        const usersCollection = db.collection("users");
        await usersCollection.updateOne({ _id: userId }, { $pull: { friendList: friendId } });
        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to unfriend", error });
    }
});

// Playlist API Requests
// Add a new playlist
app.post("/api/addPlaylist", async (req, res) => {
    try {
        const playlistsCollection = db.collection("playlists");
        const result = await playlistsCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to add playlist", error });
    }
});

// Add songs to playlist
app.post("/api/playlist/:id/addSong", async (req, res) => {
    try {
        const playlistId = req.params.id;
        const songId = req.body.songId; // Assuming songId is passed in the request body
        const playlistsCollection = db.collection("playlists");
        await playlistsCollection.updateOne({ _id: playlistId }, { $addToSet: { songs: { songId, addedAt: new Date() } } });
        res.status(200).json({ message: "Song added to playlist successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add song to playlist", error });
    }
});

// View playlist
app.get("/api/playlist/:id", async (req, res) => {
    try {
        const playlistId = req.params.id;
        const playlistsCollection = db.collection("playlists");
        const playlist = await playlistsCollection.findOne({ _id: playlistId });
        res.status(200).json(playlist);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch playlist", error });
    }
});

// Edit playlist details
app.put("/api/playlist/:id", async (req, res) => {
    try {
        const playlistId = req.params.id;
        const updatedPlaylist = req.body;
        const playlistsCollection = db.collection("playlists");
        await playlistsCollection.updateOne({ _id: playlistId }, { $set: updatedPlaylist });
        res.status(200).json({ message: "Playlist updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update playlist", error });
    }
});

// Delete playlist
app.delete("/api/playlist/:id", async (req, res) => {
    try {
        const playlistId = req.params.id;
        const playlistsCollection = db.collection("playlists");
        await playlistsCollection.deleteOne({ _id: playlistId });
        res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete playlist", error });
    }
});

// Songs API Requests
// Add a new song
app.post("/api/addSong", async (req, res) => {
    try {
        const songsCollection = db.collection("songs");
        const result = await songsCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to add song", error });
    }
});

// Delete song
app.delete("/api/song/:id", async (req, res) => {
    try {
        const songId = req.params.id;
        const songsCollection = db.collection("songs");
        await songsCollection.deleteOne({ _id: songId });
        res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete song", error });
    }
});

// Search for songs
app.get("/api/search", async (req, res) => {
    try {
        const { query } = req.query; // Assuming the search term is passed as a query parameter
        const songsCollection = db.collection("songs");
        const playlistsCollection = db.collection("playlists");
        const usersCollection = db.collection("users");

        const songs = await songsCollection.find({ title: { $regex: query, $options: "i" } }).toArray();
        const playlists = await playlistsCollection.find({ name: { $regex: query, $options: "i" } }).toArray();
        const users = await usersCollection.find({ username: { $regex: query, $options: "i" } }).toArray();

        res.status(200).json({ songs, playlists, users });
    } catch (error) {
        res.status(500).json({ message: "Failed to search", error });
    }
});
