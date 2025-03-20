// testsRoutes.js
const express = require('express');
const router = express.Router();

// Route to fetch tests from the tests table
module.exports = (db) => {
  router.get('/', (req, res) => {
    // In the Test route handler
db.query('SELECT * FROM tests', (err, results) => {
  if (err) {
    console.error('Error fetching tests:', err);
    return res.status(500).send('Error fetching tests');
  }
  console.log('Test data fetched:', results);  // Log the response
  res.json(results);
});

  });

  return router;
};
