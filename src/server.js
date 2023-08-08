// src/server.js
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

// In-memory data for demonstration purposes
let highScores = [];

// GET endpoint to retrieve high scores
app.get('/api/high-scores', (req, res) => {
  res.json(highScores);
});

// POST endpoint to add a new high score
app.post('/api/high-scores', (req, res) => {
  const { name, score } = req.body;
  if (name && score) {
    highScores.push({ name, score });
    res.status(201).json({ message: 'High score added successfully' });
  } else {
    res.status(400).json({ message: 'Bad request' });
  }
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
