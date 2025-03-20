// genresRoutes.js
const express = require('express');
const router = express.Router();

// Route to fetch genres from the genres table
module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query('SELECT * FROM genres', (err, results) => {
      if (err) {
        console.error('Error fetching genres:', err);
        return res.status(500).send('Error fetching genres');
      }
      res.json(results);
    });
  });

  return router;
};
