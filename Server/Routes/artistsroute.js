// routes/artistsroute.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/:artistName', (req, res) => {
    const artistName = req.params.artistName;

    // First, get artist info from the artists table
    db.query('SELECT * FROM artists WHERE name = ?', [artistName], (err, artistResults) => {
      if (err) {
        console.error('Error fetching artist info:', err);
        return res.status(500).send('Error fetching artist info');
      }

      if (artistResults.length === 0) {
        return res.status(404).send('Artist not found in artist table');
      }

      const artist = artistResults[0];

      // Now get songs by this artist from the songs table
      db.query('SELECT * FROM songs WHERE artist = ?', [artistName], (err, songResults) => {
        if (err) {
          console.error('Error fetching songs:', err);
          return res.status(500).send('Error fetching songs');
        }

        res.json({
          artist: artist,
          songs: songResults,
        });
      });
    });
  }); 

  return router;
};
