const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config();
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let db;

async function connectToDB() {
    try {
        await client.connect();
        db = client.db("opula");
        console.log("Connected to MongoDB!");

        app.listen(1337, () => {
            console.log("Listening on http://localhost:1337");
        });
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}
connectToDB();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // specify the directory to save the files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // specify the file naming convention
    }
});
const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        // Respond with the file info
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: 'Failed to upload file', error });
    }
});

app.post("/api/signup", async (req, res) => {
    try {
        const usersCollection = db.collection("users");
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        
        const newUser = {
            _id: new ObjectId(),
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name 
        };

        const result = await usersCollection.insertOne(newUser);
        res.status(201).json({ user: { id: result.insertedId, email: newUser.email, name: newUser.name } });
    } catch (error) {
        res.status(500).json({ message: "Failed to sign up", error });
    }
});

app.post("/api/login", async (req, res) => {
    try {
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email: req.body.email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
            if (isPasswordValid) {
                res.status(200).json({ user: { id: user._id, email: user.email, name: user.name } });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to log in", error });
    }
});

app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    console.log("Received request for user ID:", userId);
    
    try {
        // 1. Validate database connection
        if (!db) {
            console.error("Database connection not established");
            return res.status(500).json({
                message: "Database connection error",
                details: "Connection to MongoDB not established"
            });
        }

        // 2. Validate userId format
        if (!ObjectId.isValid(userId)) {
            console.error("Invalid ObjectId format:", userId);
            return res.status(400).json({
                message: "Invalid user ID format",
                details: "The provided ID is not a valid MongoDB ObjectId"
            });
        }

        // 3. Get users collection
        const usersCollection = db.collection("users");
        if (!usersCollection) {
            console.error("Users collection not found");
            return res.status(500).json({
                message: "Database error",
                details: "Users collection not found"
            });
        }

        // 4. Create ObjectId
        const objectId = new ObjectId(userId);
        console.log("Created ObjectId:", objectId);

        // 5. Query database
        console.log("Querying database...");
        const user = await usersCollection.findOne({ _id: objectId });
        console.log("Query complete. User found:", !!user);

        // 6. Handle user not found
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                details: "No user exists with the provided ID"
            });
        }

        // 7. Prepare response
        const { password, ...userWithoutPassword } = user;
        console.log("Sending response for user:", userWithoutPassword._id);
        
        return res.status(200).json(userWithoutPassword);

    } catch (error) {
        console.error("Error in /api/user/:id endpoint:", {
            error: error.message,
            stack: error.stack,
            name: error.name
        });

        return res.status(500).json({
            message: "Server error",
            details: error.message,
            type: error.name
        });
    }
});



// Logout (This is often handled on the client-side)
app.post("/api/logout", (req, res) => {
    // Logic for logout can be added here, like invalidating tokens if using JWT
    res.status(200).json({ message: "Logged out successfully" });
});

// Get friend count
app.get("/api/user/:id/friends/count", async (req, res) => {
    try {
        const userId = req.params.id;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const friendsCollection = db.collection("friends");
        const count = await friendsCollection.countDocuments({
            userId: new ObjectId(userId),
            status: "accepted" // Only count accepted friend relationships
        });

        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting friend count:", error);
        res.status(500).json({ message: "Failed to get friend count", error: error.message });
    }
});

// Get songs count
app.get("/api/user/:id/songs/count", async (req, res) => {
    try {
        const userId = req.params.id;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const songsCollection = db.collection("songs");
        const count = await songsCollection.countDocuments({
            userId: new ObjectId(userId)
        });

        res.status(200).json({ count });
    } catch (error) {
        console.error("Error getting songs count:", error);
        res.status(500).json({ message: "Failed to get songs count", error: error.message });
    }
});

// Get playlists count and saves
app.get("/api/user/:id/playlists/count", async (req, res) => {
    try {
        const userId = req.params.id;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const playlistsCollection = db.collection("playlists");
        
        // Get count of user's playlists
        const playlistCount = await playlistsCollection.countDocuments({
            userId: new ObjectId(userId)
        });

        // Get count of saves across all user's playlists
        const userPlaylists = await playlistsCollection.find({
            userId: new ObjectId(userId)
        }).toArray();

        const savedCount = userPlaylists.reduce((total, playlist) => {
            return total + (playlist.savedBy ? playlist.savedBy.length : 0);
        }, 0);

        res.status(200).json({
            playlistCount,
            savedCount
        });
    } catch (error) {
        console.error("Error getting playlist counts:", error);
        res.status(500).json({ message: "Failed to get playlist counts", error: error.message });
    }
});

// Get user's songs (paginated)
app.get("/api/user/:id/songs", async (req, res) => {
    try {
        const userId = req.params.id;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const songsCollection = db.collection("songs");
        const songs = await songsCollection
            .find({ userId: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await songsCollection.countDocuments({ userId: new ObjectId(userId) });

        res.status(200).json({
            songs,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error("Error getting user songs:", error);
        res.status(500).json({ message: "Failed to get user songs", error: error.message });
    }
});

// Get user's playlists (paginated)
app.get("/api/user/:id/playlists", async (req, res) => {
    try {
        const userId = req.params.id;
        if (!ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const playlistsCollection = db.collection("playlists");
        const playlists = await playlistsCollection
            .find({ userId: new ObjectId(userId) })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .toArray();

        const total = await playlistsCollection.countDocuments({ userId: new ObjectId(userId) });

        res.status(200).json({
            playlists,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error("Error getting user playlists:", error);
        res.status(500).json({ message: "Failed to get user playlists", error: error.message });
    }
});
// // Profile management
// // View your profile
// app.get("/api/profile", async (req, res) => {
//     try {
//         const userId = req.body.userId; // Assuming userId is passed in the request body
//         const usersCollection = db.collection("users");
//         const user = await usersCollection.findOne({ _id: ObjectId(userId) }); // Convert to ObjectId
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch profile", error });
//     }
// });

// // Edit your profile
// app.put("/api/profile", async (req, res) => {
//     try {
//         const userId = req.body.userId; // Assuming userId is passed in the request body
//         const updatedUser = req.body;
//         const usersCollection = db.collection("users");
//         await usersCollection.updateOne({ _id: ObjectId(userId) }, { $set: updatedUser }); // Convert to ObjectId
//         res.status(200).json({ message: "Profile updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to update profile", error });
//     }
// });

// // View someone else's profile
// app.get("/api/profile/:id", async (req, res) => {
//     try {
//         const userId = req.params.id;
//         const usersCollection = db.collection("users");
//         const user = await usersCollection.findOne({ _id: ObjectId(userId) }); // Convert to ObjectId
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch profile", error });
//     }
// });

// // Delete your profile
// app.delete("/api/profile", async (req, res) => {
//     try {
//         const userId = req.body.userId; // Assuming userId is passed in the request body
//         const usersCollection = db.collection("users");
//         await usersCollection.deleteOne({ _id: ObjectId(userId) }); // Convert to ObjectId
//         res.status(200).json({ message: "Profile deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to delete profile", error });
//     }
// });

// // Fetch user data by ID
// app.get("/api/user/:id", async (req, res) => {
//     try {
//         const userId = req.params.id; // Get the user ID from the request parameters
//         const usersCollection = db.collection("users");
//         const user = await usersCollection.findOne({ _id: ObjectId(userId) }); // Convert to ObjectId
//         if (user) {
//             res.status(200).json(user);
//         } else {
//             res.status(404).json({ message: "User not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch user data", error });
//     }
// });


// // Friend / Unfriend API
// app.post("/api/friend/:id", async (req, res) => {
//     try {
//         const userId = req.body.userId; // User sending the friend request
//         const friendId = req.params.id; // ID of the friend to add
//         const usersCollection = db.collection("users");
//         await usersCollection.updateOne({ _id: ObjectId(userId) }, { $addToSet: { friendList: friendId } }); // Convert to ObjectId
//         res.status(200).json({ message: "Friend added successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to add friend", error });
//     }
// });

// // Unfriend
// app.delete("/api/friend/:id", async (req, res) => {
//     try {
//         const userId = req.body.userId; // User sending the unfriend request
//         const friendId = req.params.id; // ID of the friend to remove
//         const usersCollection = db.collection("users");
//         await usersCollection.updateOne({ _id: ObjectId(userId) }, { $pull: { friendList: friendId } }); // Convert to ObjectId
//         res.status(200).json({ message: "Friend removed successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to unfriend", error });
//     }
// });

// // Playlist API Requests
// // Add a new playlist
// app.post("/api/addPlaylist", async (req, res) => {
//     try {
//         const playlistsCollection = db.collection("playlists");
//         const result = await playlistsCollection.insertOne(req.body);
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to add playlist", error });
//     }
// });

// // Add songs to playlist
// app.post("/api/playlist/:id/addSong", async (req, res) => {
//     try {
//         const playlistId = req.params.id;
//         const songId = req.body.songId; // Assuming songId is passed in the request body
//         const playlistsCollection = db.collection("playlists");
//         await playlistsCollection.updateOne({ _id: ObjectId(playlistId) }, { $addToSet: { songs: { songId, addedAt: new Date() } } }); // Convert to ObjectId
//         res.status(200).json({ message: "Song added to playlist successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to add song to playlist", error });
//     }
// });

// // View playlist
// app.get("/api/playlist/:id", async (req, res) => {
//     try {
//         const playlistId = req.params.id;
//         const playlistsCollection = db.collection("playlists");
//         const playlist = await playlistsCollection.findOne({ _id: ObjectId(playlistId) }); // Convert to ObjectId
//         res.status(200).json(playlist);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch playlist", error });
//     }
// });

// // Edit playlist details
// app.put("/api/playlist/:id", async (req, res) => {
//     try {
//         const playlistId = req.params.id;
//         const updatedPlaylist = req.body;
//         const playlistsCollection = db.collection("playlists");
//         await playlistsCollection.updateOne({ _id: ObjectId(playlistId) }, { $set: updatedPlaylist }); // Convert to ObjectId
//         res.status(200).json({ message: "Playlist updated successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to update playlist", error });
//     }
// });

// // Delete playlist
// app.delete("/api/playlist/:id", async (req, res) => {
//     try {
//         const playlistId = req.params.id;
//         const playlistsCollection = db.collection("playlists");
//         await playlistsCollection.deleteOne({ _id: ObjectId(playlistId) }); // Convert to ObjectId
//         res.status(200).json({ message: "Playlist deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to delete playlist", error });
//     }
// });

// // Songs API Requests
// // Add a new song
// app.post("/api/addSong", async (req, res) => {
//     try {
//         const songsCollection = db.collection("songs");
//         const result = await songsCollection.insertOne(req.body);
//         res.status(201).json(result);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to add song", error });
//     }
// });

// // Delete song
// app.delete("/api/song/:id", async (req, res) => {
//     try {
//         const songId = req.params.id;
//         const songsCollection = db.collection("songs");
//         await songsCollection.deleteOne({ _id: ObjectId(songId) }); // Convert to ObjectId
//         res.status(200).json({ message: "Song deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to delete song", error });
//     }
// });

// // Serve static assets for the frontend
// app.use(express.static("frontend/public"));

// // Handle 404 errors for unrecognized routes
// app.use((req, res) => {
//     res.status(404).json({ message: "Route not found" });
// });
// app.get('/api/friend/status/:targetId', async (req, res) => {
//     try {
//         const userId = req.headers.userid;
//         const targetId = req.params.targetId;
        
//         if (!ObjectId.isValid(userId) || !ObjectId.isValid(targetId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const usersCollection = db.collection("users");
//         const user = await usersCollection.findOne(
//             { _id: new ObjectId(userId) }
//         );

//         const isFriend = user.friendList?.includes(targetId) || false;
//         res.json({ isFriend });
//     } catch (error) {
//         console.error('Error checking friend status:', error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// // Add friend
// app.post('/api/friend/:targetId', async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const targetId = req.params.targetId;

//         if (!ObjectId.isValid(userId) || !ObjectId.isValid(targetId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const usersCollection = db.collection("users");
        
//         // Add friend to current user's friend list
//         await usersCollection.updateOne(
//             { _id: new ObjectId(userId) },
//             { $addToSet: { friendList: targetId } }
//         );

//         // Add current user to target user's friend list
//         await usersCollection.updateOne(
//             { _id: new ObjectId(targetId) },
//             { $addToSet: { friendList: userId } }
//         );

//         res.json({ message: "Friend added successfully" });
//     } catch (error) {
//         console.error('Error adding friend:', error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });

// // Remove friend
// app.delete('/api/friend/:targetId', async (req, res) => {
//     try {
//         const { userId } = req.body;
//         const targetId = req.params.targetId;

//         if (!ObjectId.isValid(userId) || !ObjectId.isValid(targetId)) {
//             return res.status(400).json({ message: "Invalid user ID format" });
//         }

//         const usersCollection = db.collection("users");
        
//         // Remove friend from current user's friend list
//         await usersCollection.updateOne(
//             { _id: new ObjectId(userId) },
//             { $pull: { friendList: targetId } }
//         );

//         // Remove current user from target user's friend list
//         await usersCollection.updateOne(
//             { _id: new ObjectId(targetId) },
//             { $pull: { friendList: userId } }
//         );

//         res.json({ message: "Friend removed successfully" });
//     } catch (error) {
//         console.error('Error removing friend:', error);
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// });