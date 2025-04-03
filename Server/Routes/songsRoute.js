// songsRoutes.js
const express = require('express');
const router = express.Router();

// Route to fetch songs for a specific genre
module.exports = (db) => {
  router.get('/:genreId', (req, res) => {
    const genreId = req.params.genreId;

    // Query to get all songs for the selected genre
    db.query('SELECT * FROM songs WHERE genre_id = ?', [genreId], (err, results) => {
      if (err) {
        console.error('Error fetching songs:', err);
        return res.status(500).send('Error fetching songs');
      }
      res.json(results); // Return the songs as JSON
    });
  });

  return router;
};
