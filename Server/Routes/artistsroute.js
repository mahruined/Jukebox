const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // Endpoint to get songs by artist name
  router.get('/:artist', (req, res) => {
    const artist = req.params.artist;

    db.query('SELECT * FROM songs WHERE artist = ?', [artist], (err, results) => {
      if (err) {
        console.error('Error fetching songs:', err);
        return res.status(500).send('Error fetching songs');
      }
      if (results.length === 0) {
        return res.status(404).send('Artist not found');
      }
      res.json(results);  // Return the songs as JSON
    });
  });

  return router;
};
