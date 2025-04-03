const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const songsRoutes = require('./Routes/songsRoute');
const genresRoutes = require('./Routes/GenresRoute');
const artistRoutes = require('./Routes/artistsroute');  // Correct import here
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));  // All static files in the "public" folder will be served.

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'jukebox',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to the MySQL database.');
  }
});

// Use the genresRoutes for the /api/genres endpoint
app.use('/api/genres', genresRoutes(db));

// Use the songsRoute for the /api/songs endpoint
app.use('/api/songs', songsRoutes(db));

// Use the artistRoutes for the /api/artists endpoint
app.use('/api/artists', artistRoutes(db));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
