const express = require("express");
const { MongoClient } = require("mongodb");
require('dotenv').config();

// Initialize the app
const app = express();
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

// Add a new user
app.post("/addUser", async (req, res) => {
    try {
        const usersCollection = db.collection("users"); // Use the "users" collection
        const result = await usersCollection.insertOne(req.body); // Insert the user
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to add user", error });
    }
});

// Add a new playlist
app.post("/addPlaylist", async (req, res) => {
    try {
        const playlistsCollection = db.collection("playlists"); // Use the "playlists" collection
        const result = await playlistsCollection.insertOne(req.body); // Insert the playlist
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to add playlist", error });
    }
});

// Add a new song
app.post("/addSong", async (req, res) => {
    try {
        const songsCollection = db.collection("songs"); // Use the "songs" collection
        const result = await songsCollection.insertOne(req.body); // Insert the song
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: "Failed to add song", error });
    }
});

// Get all users
app.get("/users", async (req, res) => {
    try {
        const usersCollection = db.collection("users");
        const users = await usersCollection.find({}).toArray(); // Fetch all users
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
});

// Get all playlists
app.get("/playlists", async (req, res) => {
    try {
        const playlistsCollection = db.collection("playlists");
        const playlists = await playlistsCollection.find({}).toArray(); // Fetch all playlists
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch playlists", error });
    }
});

// Get all songs
app.get("/songs", async (req, res) => {
    try {
        const songsCollection = db.collection("songs");
        const songs = await songsCollection.find({}).toArray(); // Fetch all songs
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch songs", error });
    }
});

// Home route (for testing)
app.get("/", (req, res) => {
    res.send("API is running...");
});

// Connect to MongoDB and start the server
connectToDB();
