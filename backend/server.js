const express = require("express");
//CREATE APP
const app = express();
//SERVE A STATIC PAGE IN THE PUBLIC DIRECTORY
app.use(express.static("./frontend/public"));
//PORT TO LISTEN TO
app.listen(1337, () => {
console.log("Listening on localhost:1337");
});

// const express = require('express');
// const path = require('path');
// const app = express();

// // Serve static files from the frontend/public directory
// app.use(express.static(path.join(__dirname, 'frontend/public')));

// // Always return index.html for client-side routes (this is important)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend/public', 'index.html'));
// });

// const PORT = process.env.PORT || 1337;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

