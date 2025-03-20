const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const genresRoutes = require('./Routes/GenresRoute');
const testRoutes = require('./Routes/TestRoute');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static('public'));  // All static files in the "public" folder will be served.

app.use('/images', express.static('images'));  // Serve images from the "images" folder

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

// Use the testRoutes for the /api/test endpoint
app.use('/api/test', testRoutes(db)); 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
